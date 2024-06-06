# SafeFileShare
This project demonstrates how to build a web application that allows users to upload files to Azure Blob Storage. The application also generates unique links for each uploaded file and ensures secure access using SAS tokens. Additionally, it includes monitoring and automatic cleanup of inactive files.

Azure Services Used:
- Azure Blob Storage: Stores uploaded files.
- Azure Web Apps: Hosts the web application.


Steps to Set Up the System:
1. Storage Setup

    1.1 Set up an Azure Blob Storage account and create a container to store the uploaded files.
    - Navigate to the Azure portal.
    - Create a new Storage account.
    - Create a container within the storage account.

    1.2 Configure appropriate security settings, ensuring data at rest encryption is enabled.
    - Enable encryption in the storage account settings.
    - Set access policies and permissions.

2. Web Application Deployment

    2.1 Develop a web application that allows users to upload files using your preferred framework (e.g., ASP.NET Core, Node.js).
      - Create a new web application project.
      - Implement file upload functionality in the application.

    2.2 Deploy the application to Azure Web Apps.
      - Navigate to the Azure portal.
      - Create a new Web App service.
      - Deploy your application code to the Web App service.

3. File Upload Logic

    3.1 Integrate Azure Blob Storage SDKs/APIs in the web application to facilitate the file upload process directly to Blob Storage.
      - Use Azure SDKs for your programming language to upload files.
      - Ensure proper handling of storage connection strings and keys using Azure KeyVault.

4. Unique Link Generation

    4.1 When a file is uploaded, use Azure Storage SDK to generate a unique link for the user.
      - Generate a SAS (Shared Access Signature) token for each uploaded file.
      - Provide the unique link with the SAS token to the user.

5. Use Secure Access to Your Storage Account

    5.1 Use SAS (Shared Access Signature) to provide your application time-sensitive access to your storage account.
      - Configure SAS tokens with appropriate permissions and expiration times.
      - Integrate SAS token generation in your web application logic.

6. Monitoring and Cleanup

    6.1 Set up monitoring to track file upload/download activities.
      - Use Azure Monitor to track and log storage activities.
      - Set up alerts for unusual activities.

    6.2 Use Azure lifecycle management to delete files that have been inactive for over 24 hours.
      - Configure lifecycle management policies in Azure Blob Storage.
      - Set rules to delete or archive inactive files after 24 hours.

Getting Started
1. Clone this repository.
2. Set up Azure Blob Storage and static web app outlined above.
3. Configure the web application with the necessary Azure credentials and connection strings.
4. Deploy the web application to Azure Web Apps.
5. Start uploading files and monitor the activities.

Contributions:

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

License:

This project is licensed under the MIT License. See the LICENSE file for more details.

This README provides an overview of the file upload web application and guides users through the setup and configuration process. For detailed instructions and troubleshooting, please refer to the Azure documentation and the specific SDK documentation for your programming language.
