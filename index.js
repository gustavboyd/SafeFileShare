const { BlobServiceClient } = require("@azure/storage-blob");

const selectButton = document.getElementById("select-button");
const fileInput = document.getElementById("file-input");
const status = document.getElementById("status");
const listButton = document.getElementById("list-button");
const fileList = document.getElementById("file-list");

const reportStatus = message => {
    // Create a div element to contain the message
    const messageDiv = document.createElement("div");
    
    // Check if the message starts with "Download link: "
    if (message.startsWith("Download link: ")) {
        // Extract the download link from the message
        const downloadLink = message.substring("Download link: ".length);
        
        // Create an anchor element
        const linkElement = document.createElement("a");
        linkElement.href = downloadLink;
        linkElement.textContent = downloadLink;
        
        // Append the anchor element to the message div
        messageDiv.appendChild(linkElement);
    } else {
        // For other messages, simply display them
        messageDiv.textContent = message;
    }
    
    // Append the message div to the status element
    status.appendChild(messageDiv);
    status.innerHTML += "<br/>"; // Add a line break
    status.scrollTop = status.scrollHeight;
}


// Assume containerSasToken is the container-level SAS token obtained from Azure portal or Storage Explorer
const containerSasToken = "sp=r&st=2024-04-06T22:33:16Z&se=2025-01-02T07:33:16Z&spr=https&sv=2022-11-02&sr=c&sig=c1%2F08C7eazkol0bsNxRROQoJKFM54RWZnOMU%2FLAX4v4%3D";

// Update <placeholder> with your Blob service SAS URL string
const blobSasUrl = "https://filesharewebapp228.blob.core.windows.net/?sv=2022-11-02&ss=b&srt=sco&sp=rwlactf&se=2025-01-01T13:16:11Z&st=2024-03-31T04:16:11Z&spr=https&sig=rLlHDqlzgEjNCvvltN%2BdRl6tkmul4l923xBMlSIqEaQ%3D";

// Create a new BlobServiceClient
const blobServiceClient = new BlobServiceClient(blobSasUrl);

// Replace the placeholder with the name of your container
const containerName = "sharedfiles";

// Get a container client from the BlobServiceClient
const containerClient = blobServiceClient.getContainerClient(containerName);

// Function to construct download link for a file using the container SAS token and object name (blob name)
const constructDownloadLink = (containerSasToken, objectName) => {
    // Encode the object name (blob name) to handle spaces and special characters
    const encodedObjectName = encodeURIComponent(objectName);
    // Construct URL with container name, encoded object name, and container SAS token
    const downloadLink = `https://filesharewebapp228.blob.core.windows.net/sharedfiles/${encodedObjectName}?${containerSasToken}`;
    return downloadLink;
}

const uploadFiles = async () => {
    try {
        reportStatus("Uploading files...");
        const promises = [];
        for (const file of fileInput.files) {
            const blockBlobClient = containerClient.getBlockBlobClient(file.name);
            promises.push(blockBlobClient.uploadBrowserData(file));
        }
        await Promise.all(promises);
        reportStatus("Done.");
        listFiles();

        for (const file of fileInput.files) {
            const objectName = file.name; // Object name (blob name) of the uploaded file
            const downloadLink = constructDownloadLink(containerSasToken, objectName);
            // console.log("Download Link for", objectName, ":", downloadLink);
            // Use download link as needed (e.g., display to the user)
            reportStatus(" ");
            reportStatus("Download link: " + downloadLink);
            reportStatus(" ");
        }
    }
    catch (error) {
            reportStatus(error.message);
    }
}

const listFiles = async () => {
    fileList.size = 0;
    fileList.innerHTML = "";
    try {
        reportStatus("Retrieving file list...");
        let iter = containerClient.listBlobsFlat();
        let blobItem = await iter.next();
        while (!blobItem.done) {
            fileList.size += 1;
            fileList.innerHTML += `<option>${blobItem.value.name}</option>`;


            blobItem = await iter.next();
        }
        if (fileList.size > 0) {
            reportStatus("Done.");
        } else {
            reportStatus("The container does not contain any files.");
        }
    } catch (error) {
        reportStatus(error.message);
    }
};

listButton.addEventListener("click", listFiles);
selectButton.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", uploadFiles);
