import Card from "../../../../components/card";
import { get } from "../../../../Hooks/api";
import { useEffect, useState } from "react";
import Spinner from "../../../../components/spinner/Spinner";

interface StorageProps {
  onEditorDataChange: (editoData: any) => void;
}
const Storage: React.FC<StorageProps> = ({ onEditorDataChange }) => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [editorData, setEditorData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const getNewsLetterData = await get("news-letter/get-newsletter-data/");
      console.log("getNewsLetterData: ", getNewsLetterData);
      setData(getNewsLetterData);
    };
    fetchData();
  }, []);

  const hanldeGenerate = async (id: number) => {
    setIsLoading(true);
    const generateRes = await get("news-letter/process-pdf/" + id + "/");
    console.log("generateRes: ", generateRes);
    onEditorDataChange(generateRes);
    setIsLoading(false);
  };
  const handleViewContent = (id: number) => {
    // get-news-letter-content/<int:id>/</int:id>
    get("news-letter/newsletter-content/" + id + "/")
      .then((response) => {
        console.log(response);
        onEditorDataChange(response.news_letter_content);
      })
      .catch((error) => {
        console.error("Error fetching newsletter content:", error);
      });
  };

  return (
    <>
      <Card extra={"w-full h-full p-4"}>
        {isLoading && <Spinner />}
        <div className="h-96 overflow-auto">
          {data ? (
            data.map(
              (item: {
                id: number;
                title: string;
                date: string;
                isGenerated: boolean;
              }) => (
                <div className="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none mb-4">
                  <div className="flex items-center">
                    <div className="">
                      <svg
                        version="1.1"
                        id="_x34_"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        width="64px"
                        height="64px"
                        fill="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <g>
                            <polygon
                              style={{ fill: "#FFFEFE" }}
                              points="475.435,117.825 475.435,512 47.791,512 47.791,0.002 357.613,0.002 412.491,54.881 "
                            ></polygon>
                            <rect
                              x="36.565"
                              y="34.295"
                              style={{ fill: "#B43331" }}
                              width="205.097"
                              height="91.768"
                            ></rect>
                            <g>
                              <g>
                                <path
                                  style={{ fill: "#FFFEFE" }}
                                  d="M110.133,64.379c-0.905-2.186-2.111-4.146-3.769-5.804c-1.659-1.658-3.694-3.015-6.031-3.92 c-2.412-0.98-5.127-1.432-8.141-1.432H69.652v58.195h11.383V89.481h11.157c3.015,0,5.729-0.452,8.141-1.432 c2.337-0.905,4.371-2.261,6.031-3.92c1.658-1.658,2.865-3.543,3.769-5.804c0.828-2.186,1.281-4.523,1.281-6.935 C111.413,68.902,110.961,66.565,110.133,64.379z M97.845,77.118c-1.508,1.432-3.618,2.186-6.182,2.186H81.035V63.323h10.628 c2.564,0,4.674,0.754,6.182,2.261c1.432,1.432,2.185,3.392,2.185,5.804C100.031,73.726,99.277,75.686,97.845,77.118z"
                                ></path>
                                <path
                                  style={{ fill: "#FFFEFE" }}
                                  d="M164.558,75.761c-0.075-2.035-0.15-3.844-0.377-5.503c-0.225-1.659-0.603-3.166-1.131-4.598 c-0.527-1.357-1.206-2.714-2.111-3.92c-2.035-2.94-4.522-5.126-7.312-6.483c-2.864-1.357-6.256-2.035-10.252-2.035H122.42v58.195 h20.956c3.996,0,7.388-0.678,10.252-2.035c2.79-1.357,5.277-3.543,7.312-6.483c0.905-1.206,1.584-2.563,2.111-3.92 c0.528-1.432,0.905-2.94,1.131-4.598c0.227-1.658,0.301-3.468,0.377-5.503c0.075-1.96,0.075-4.146,0.075-6.558 C164.633,79.908,164.633,77.721,164.558,75.761z M153.175,88.2c0,1.734-0.15,3.091-0.302,4.297 c-0.151,1.131-0.376,2.186-0.678,2.94c-0.301,0.829-0.754,1.583-1.281,2.261c-1.885,2.412-4.749,3.543-8.518,3.543h-8.668V63.323 h8.668c3.769,0,6.634,1.206,8.518,3.618c0.528,0.678,0.98,1.357,1.281,2.186c0.302,0.829,0.528,1.809,0.678,3.015 c0.152,1.131,0.302,2.563,0.302,4.221c0.075,1.659,0.075,3.694,0.075,5.955C153.251,84.581,153.251,86.541,153.175,88.2z"
                                ></path>
                                <path
                                  style={{ fill: "#FFFEFE" }}
                                  d="M213.18,63.323V53.222h-38.37v58.195h11.383V87.823h22.992V77.646h-22.992V63.323H213.18z"
                                ></path>
                              </g>
                              <g>
                                <path
                                  style={{ fill: "#FFFEFE" }}
                                  d="M110.133,64.379c-0.905-2.186-2.111-4.146-3.769-5.804c-1.659-1.658-3.694-3.015-6.031-3.92 c-2.412-0.98-5.127-1.432-8.141-1.432H69.652v58.195h11.383V89.481h11.157c3.015,0,5.729-0.452,8.141-1.432 c2.337-0.905,4.371-2.261,6.031-3.92c1.658-1.658,2.865-3.543,3.769-5.804c0.828-2.186,1.281-4.523,1.281-6.935 C111.413,68.902,110.961,66.565,110.133,64.379z M97.845,77.118c-1.508,1.432-3.618,2.186-6.182,2.186H81.035V63.323h10.628 c2.564,0,4.674,0.754,6.182,2.261c1.432,1.432,2.185,3.392,2.185,5.804C100.031,73.726,99.277,75.686,97.845,77.118z"
                                ></path>
                              </g>
                            </g>
                            <polygon
                              style={{ opacity: "0.08", fill: "#040000" }}
                              points="475.435,117.825 475.435,512 47.791,512 47.791,419.581 247.706,219.667 259.541,207.832 266.099,201.273 277.029,190.343 289.995,177.377 412.491,54.881 "
                            ></polygon>
                            <polygon
                              style={{ fill: "#BBBBBA" }}
                              points="475.435,117.836 357.6,117.836 357.6,0 "
                            ></polygon>
                            <g>
                              <path
                                style={{ fill: "#B43331" }}
                                d="M414.376,370.658c-2.488-4.372-5.88-8.518-10.101-12.287c-3.467-3.166-7.538-6.106-12.137-8.82 c-18.543-10.93-45.003-16.207-80.961-16.207h-3.618c-1.96-1.809-3.996-3.618-6.106-5.503 c-13.644-12.287-24.499-25.63-32.942-40.48c16.583-36.561,24.499-69.126,23.519-96.867c-0.151-4.674-0.83-9.046-2.036-13.117 c-1.808-6.558-4.824-12.363-9.046-17.112c-0.075-0.075-0.075-0.075-0.15-0.151c-6.709-7.538-16.056-11.835-25.555-11.835 c-9.574,0-18.393,4.146-24.802,11.76c-6.331,7.538-9.724,17.866-9.875,30.002c-0.225,18.544,1.282,36.108,4.448,52.315 c0.301,1.282,0.528,2.563,0.829,3.844c3.166,14.7,7.84,28.645,13.871,41.611c-7.086,14.398-14.248,26.836-19.222,35.279 c-3.769,6.408-7.916,13.117-12.213,19.826c-19.373,3.468-35.807,7.689-50.129,12.966c-19.374,7.011-34.903,16.056-46.059,26.836 c-7.238,6.935-12.137,14.323-14.55,22.012c-2.563,7.915-2.411,15.83,0.453,22.916c2.638,6.558,7.387,12.061,13.719,15.83 c1.508,0.905,3.091,1.658,4.749,2.337c4.825,1.96,10.102,3.015,15.604,3.015c12.74,0,25.856-5.503,36.938-15.378 c20.654-18.469,41.988-48.169,54.576-66.94c10.327-1.583,21.559-2.94,34.224-4.297c14.927-1.508,28.118-2.412,40.104-2.865 c3.694,3.317,7.237,6.483,10.63,9.498c18.846,16.81,33.168,28.947,46.134,37.465c0,0.075,0.075,0.075,0.15,0.075 c5.127,3.392,10.026,6.181,14.926,8.443c5.502,2.563,11.081,3.92,16.81,3.92c7.237,0,14.021-2.186,19.675-6.181 c5.729-4.146,9.875-10.101,11.76-16.81C420.181,387.694,418.899,378.724,414.376,370.658z M247.706,219.667 c-1.056-9.348-1.508-19.072-1.357-29.324c0.15-9.724,3.694-16.283,8.895-16.283c3.919,0,8.066,3.543,9.951,10.327 c0.528,2.035,0.905,4.372,0.98,7.01c0.15,3.166,0.075,6.483-0.075,9.875c-0.452,9.574-2.112,19.75-4.976,30.681 c-1.734,7.011-3.995,14.323-6.784,21.936C251.173,243.186,248.911,231.803,247.706,219.667z M121.968,418.073 c-1.282-3.166,0.15-9.272,7.99-16.81c11.985-11.458,30.755-20.504,56.914-27.364c-4.976,6.784-9.875,12.966-14.625,18.619 c-7.237,8.744-14.172,16.132-20.429,21.71c-5.351,4.824-11.232,7.84-16.81,8.594c-0.98,0.151-1.96,0.226-2.94,0.226 C127.169,423.049,123.173,421.089,121.968,418.073z M242.428,337.942l0.528-0.829l-0.829,0.151 c0.15-0.377,0.377-0.754,0.602-1.055c3.167-5.352,7.161-12.212,11.458-20.127l0.377,0.829l0.98-2.035 c3.166,4.523,6.634,8.971,10.252,13.267c1.735,2.035,3.544,3.995,5.352,5.955l-1.205,0.075l1.055,0.98 c-3.09,0.226-6.331,0.528-9.573,0.829c-2.036,0.226-4.147,0.377-6.257,0.603C250.796,337.037,246.499,337.49,242.428,337.942z M369.298,384.98c-8.97-5.729-18.997-13.795-31.36-24.575c17.564,1.809,31.36,5.654,41.159,11.383 c4.297,2.488,7.538,5.051,9.724,7.538c3.619,3.844,4.901,7.312,4.221,9.649c-0.602,2.337-3.241,3.92-6.483,3.92 c-1.885,0-3.844-0.452-5.879-1.432c-3.468-1.658-7.086-3.694-10.931-6.181C369.598,385.282,369.448,385.131,369.298,384.98z"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-base font-medium text-navy-700 dark:text-white">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        {/* <a
                    className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                    href=" "
                  > */}
                        {item.date}
                        {/* </a> */}
                      </p>
                    </div>
                  </div>
                  <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
                    {item.isGenerated ? (
                      <button
                        onClick={() => {
                          handleViewContent(item.id);
                        }}
                        className="linear rounded-md bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
                        // disabled={item.isGenerated}
                      >
                        View
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          hanldeGenerate(item.id);
                        }}
                        className="linear rounded-md bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
                        // disabled={item.isGenerated}
                      >
                        Generate
                      </button>
                    )}
                  </div>
                </div>
              )
            )
          ) : (
            <Spinner />
          )}
        </div>
      </Card>
    </>
  );
};

export default Storage;
