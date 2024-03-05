import axios from "axios";
import { MdDownload } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { useEffect, useState } from "react";

function DownUpButton() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDownloading, setIsDowloading] = useState(false);

  const handleIsUpdating = async () => {
    // setIsUpdating(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/is_updating/",
        {
          withCredentials: true,
          maxRedirects: 5,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res: ", response);
      if (response.status !== 200) {
        setIsUpdating(false);
        throw new Error("Network response was not ok");
      }
      console.log("data: ", response.data);
      return response.data;
    } catch (error) {
      setIsUpdating(false);
      throw new Error("Error:");
    }
  };

  useEffect(() => {
    handleIsUpdating()
      .then((data) => {
        setIsUpdating(data.is_updating);
      })
      .catch((error) => {
        setIsUpdating(false);
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/update_api/",
        {
          withCredentials: true,
          maxRedirects: 5,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res: ", response);
      if (response.status !== 200) {
        setIsUpdating(false);
        throw new Error("Network response was not ok");
      }
      console.log("data: ", response.data);
      setIsUpdating(false);

      return response.data;
    } catch (error) {
      setIsUpdating(false);

      throw new Error("Error:");
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/download_excel/",
        {
          responseType: "blob", // Important for downloading files
          withCredentials: true,
        }
      );
      console.log("res: ", response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "lists_and_segments.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };
  return (
    <div className="pt-4 pb-4 grid grid-cols-9 gap-4">
      <button
        disabled={isUpdating}
        onClick={handleUpdate}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
      >
        {isUpdating ? (
          <>
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Updating...
          </>
        ) : (
          <>
            <RxUpdate w-6 h-6 className="mr-2" />
            Update
          </>
        )}
      </button>

      <button
        disabled={isDownloading}
        type="button"
        onClick={handleIsUpdating}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
      >
        {isDownloading ? (
          <>
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Dowloading...
          </>
        ) : (
          <>
            <MdDownload w-6 h-6 className="mr-2" />
            Download
          </>
        )}
      </button>
    </div>
  );
}

export default DownUpButton;
