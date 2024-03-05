import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import Widget from "../../../components/widget/Widget";

import ColumnsTable from "../tables/components/ColumnsTable";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../../components/spinner/Spinner";

const Dashboard = () => {
  // const { loading, error, get, post, getCsrf, getSession } = useAxios();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [segementSize, setSegementSize] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [totalSegmentMembers, setTotalSegmentMembers] = useState(0);
  const [totaltMembers, setTotalMembers] = useState(0);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8000/api/get_json/",
        withCredentials: true,
        maxRedirects: 5,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 200) {
        setIsLoading(false);
        throw new Error("Network response was not ok");
      }
      return response.data;
    } catch (error) {
      setIsLoading(false);
      throw new Error("Error fetching data");
    }
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Adjust the formatting options as needed
  };

  useEffect(() => {
    fetchData()
      .then((data) => {
        setIsLoading(false);
        // setData(data);

        console.log("data: ", data);

        const transformedData = [];

        for (let i = 0; i < data.ID.length; i++) {
          transformedData.push({
            ID: data.ID[i],
            Name: data.Name[i],
            "Created At": formatDate(data["Created At"][i]),
            "Updated At": formatDate(data["Updated At"][i]),
            Members: data.Members[i],
            Type: data.Type[i],
            "Definition Link": data["Definition Link"][i],
          });
        }
        setData(transformedData);
        const segSize = transformedData?.filter(
          (item: any) => item.Type === "Segment"
        ).length;
        setSegementSize(segSize);
        setTotalSize(transformedData?.length);

        const totalSegmentMembers = transformedData
          .filter((item) => item.Type === "List")
          .reduce((acc, curr) => acc + curr.Members, 0);
        console.log("Total segment members: ", totalSegmentMembers);

        setTotalSegmentMembers(totalSegmentMembers);

        const totalMembers = transformedData.reduce(
          (acc, curr) => acc + curr.Members,
          0
        );

        console.log("Total members: ", totalMembers);
        setTotalMembers(totalMembers);

        console.log("transformedData: ", transformedData);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      });
  }, []);
  const numberWithCommas = (number: number) => {
    return number.toLocaleString();
  };
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
            <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Segments"}
              subtitle={`${numberWithCommas(segementSize)}`}
            />
            <Widget
              icon={<IoDocuments className="h-6 w-6" />}
              title={"Lists"}
              subtitle={`${numberWithCommas(totalSize - segementSize)}`}
            />
            <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Total"}
              subtitle={`${numberWithCommas(totalSize)}`}
            />
            <Widget
              icon={<MdDashboard className="h-6 w-6" />}
              title={"Total Segment Members"}
              subtitle={`${numberWithCommas(totalSegmentMembers)}`}
            />
            <Widget
              icon={<MdBarChart className="h-7 w-7" />}
              title={"Total List Members"}
              subtitle={`${numberWithCommas(
                totaltMembers - totalSegmentMembers
              )}`}
            />
            <Widget
              icon={<IoMdHome className="h-6 w-6" />}
              title={"Total Members"}
              subtitle={`${numberWithCommas(totaltMembers)}`}
            />
          </div>
          <div className="mt-5">
            {data && data.length > 0 ? <ColumnsTable tableData={data} /> : null}
          </div>

          {/* Charts */}
          {/* 
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div> */}

          {/* Tables & Charts */}

          <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
            {/* Check Table */}
            {/* <div>
          <CheckTable tableData={tableDataCheck} />
        </div> */}

            {/* Traffic chart & Pie Chart */}

            {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div> */}

            {/* Complex Table , Task & Calendar */}

            {/* <ComplexTable tableData={tableDataComplex} /> */}

            {/* Task chart & Calendar */}

            {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
