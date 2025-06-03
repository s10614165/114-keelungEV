import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { Row, Col } from "antd";
import FooterBgcImg from "@/components/FooterBgcImg";
import useGoogleSheet from "@/hooks/useGoogleSheet";
import Loading from "@/components/Loading";
import PageError from "../components/PageError";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import DonutChart from "@/components/DonutChart";
import DonutChartNone from "@/components/DonutChartNoneColor";
import ChartCard from "../components/ChartCard";

// 正確的模組導入方式
import "highcharts/highcharts-more";
import "highcharts/modules/solid-gauge";

const sheetId = import.meta.env.VITE_Main_GogleSheet__ID;
import PolicyIcon from "@/assets/icon/icon-policy.svg";

// 數據處理函數
function processApiData(apiResponse) {
  if (!apiResponse || !apiResponse.values) return null;

  // 過濾掉前三行標題和包含特定文字的行
  const filteredValues = apiResponse.values.filter((row, index) => {
    // 跳過前三行
    if (index < 3) return false;

    // 跳過包含特定文字的行
    if (row[1] === "實際%數" || row[1] === "實際申請筆數") return false;

    return true;
  });
  console.log(filteredValues);
  return {
    // 1. 申請進度總覽
    applicationOverview: {
      completed: parseInt(filteredValues[2][2]) || 0,
      pending: parseInt(filteredValues[2][3]) || 0,
      completedPercentage:
        parseInt(filteredValues[1][2]?.replace("%", "")) || 0,
      pendingPercentage: parseInt(filteredValues[1][3]?.replace("%", "")) || 0,
    },

    // 2. 申請核銷狀態
    approvalStatus: {
      inProgress: parseInt(filteredValues[5][2]) || 0,
      approved: parseInt(filteredValues[5][3]) || 0,
      inProgressPercentage:
        parseInt(filteredValues[4][2]?.replace("%", "")) || 0,
      approvedPercentage: parseInt(filteredValues[4][3]?.replace("%", "")) || 0,
    },

    // 3. 各區申請比例
    districtApplication: [
      {
        name: "中山區",
        value: parseInt(filteredValues[8][2]) || 0,
        percentage: parseInt(filteredValues[7][2]?.replace("%", "")) || 0,
        color: "#7973FF",
      },
      {
        name: "中正區",
        value: parseInt(filteredValues[8][3]) || 0,
        percentage: parseInt(filteredValues[7][3]?.replace("%", "")) || 0,
        color: "#42E82C",
      },
      {
        name: "仁愛區",
        value: parseInt(filteredValues[8][4]) || 0,
        percentage: parseInt(filteredValues[7][4]?.replace("%", "")) || 0,
        color: "#FF7B4B",
      },
      {
        name: "安樂區",
        value: parseInt(filteredValues[8][5]) || 0,
        percentage: parseInt(filteredValues[7][5]?.replace("%", "")) || 0,
        color: "#FF546E",
      },
      {
        name: "信義區",
        value: parseInt(filteredValues[8][6]) || 0,
        percentage: parseInt(filteredValues[7][6]?.replace("%", "")) || 0,
        color: "#D568FB",
      },
      {
        name: "暖暖區",
        value: parseInt(filteredValues[8][7]) || 0,
        percentage: parseInt(filteredValues[7][7]?.replace("%", "")) || 0,
        color: "#CDE000",
      },
      {
        name: "七堵區",
        value: parseInt(filteredValues[8][8]) || 0,
        percentage: parseInt(filteredValues[7][8]?.replace("%", "")) || 0,
        color: "#36CBDA",
      },
    ],

    // 4. 每月申請狀態
    monthlyApplication: Array.from({ length: 11 }, (_, index) => {
      const colors = ["#42E82C", "#36CBDA", "#7973FF"];
      return {
        name: filteredValues[9][index + 2] || "",
        value: parseInt(filteredValues[11][index + 2]) || 0,
        percentage:
          parseInt(filteredValues[10][index + 2]?.replace("%", "")) || 0,
        color: colors[index],
      };
    }),

    // 5. 申請平均核准日
    approvalDays: [
      { name: "0-5天", value: parseInt(filteredValues[13][2]) || 0 },
      { name: "6-10天", value: parseInt(filteredValues[13][3]) || 0 },
      { name: "11天以上", value: parseInt(filteredValues[13][4]) || 0 },
    ],

    // 6. 核銷平均請領日
    claimDays: [
      { name: "0-5天", value: parseInt(filteredValues[15][2]) || 0 },
      { name: "6-10天", value: parseInt(filteredValues[15][3]) || 0 },
      { name: "11-15天", value: parseInt(filteredValues[15][4]) || 0 },
      { name: "16-20天", value: parseInt(filteredValues[15][5]) || 0 },
      { name: "21天以上", value: parseInt(filteredValues[15][6]) || 0 },
    ],

    // 7. 各區核銷比例
    districtApproval: [
      {
        name: "中山區",
        inProgress: parseInt(filteredValues[17][2]) || 0,
        completed: parseInt(filteredValues[18][2]) || 0,
      },
      {
        name: "中正區",
        inProgress: parseInt(filteredValues[17][3]) || 0,
        completed: parseInt(filteredValues[18][3]) || 0,
      },
      {
        name: "仁愛區",
        inProgress: parseInt(filteredValues[17][4]) || 0,
        completed: parseInt(filteredValues[18][4]) || 0,
      },
      {
        name: "安樂區",
        inProgress: parseInt(filteredValues[17][5]) || 0,
        completed: parseInt(filteredValues[18][5]) || 0,
      },
      {
        name: "信義區",
        inProgress: parseInt(filteredValues[17][6]) || 0,
        completed: parseInt(filteredValues[18][6]) || 0,
      },
      {
        name: "暖暖區",
        inProgress: parseInt(filteredValues[17][7]) || 0,
        completed: parseInt(filteredValues[18][7]) || 0,
      },
      {
        name: "七堵區",
        inProgress: parseInt(filteredValues[17][8]) || 0,
        completed: parseInt(filteredValues[18][8]) || 0,
      },
    ],

    // 8. 各品牌申請比例
    brandApplication: [
      {
        name: "SYM三陽",
        value: parseInt(filteredValues[21][2]) || 0,
        percentage: parseInt(filteredValues[20][2]) || 0,
      },
      {
        name: "YAMAHA山葉",
        value: parseInt(filteredValues[21][3]) || 0,
        percentage: parseInt(filteredValues[20][3]) || 0,
      },
      {
        name: "eMOVING中華",
        value: parseInt(filteredValues[21][4]) || 0,
        percentage: parseInt(filteredValues[20][4]) || 0,
      },
      {
        name: "eReady台鈴",
        value: parseInt(filteredValues[21][5]) || 0,
        percentage: parseInt(filteredValues[20][5]) || 0,
      },

      {
        name: "Ionex光陽",
        value: parseInt(filteredValues[21][6]) || 0,
        percentage: parseInt(filteredValues[20][6]) || 0,
      },
      {
        name: "AeonMOTOR宏佳騰",
        value: parseInt(filteredValues[21][7]) || 0,
        percentage: parseInt(filteredValues[20][7]) || 0,
      },
      {
        name: "Zau泓創綠能",
        value: parseInt(filteredValues[21][8]) || 0,
        percentage: parseInt(filteredValues[20][8]) || 0,
      },
      {
        name: "Gogoro睿能",
        value: parseInt(filteredValues[21][9]) || 0,
        percentage: parseInt(filteredValues[20][9]) || 0,
      },
      {
        name: "PGO 摩特動力",
        value: parseInt(filteredValues[21][10]) || 0,
        percentage: parseInt(filteredValues[20][10]) || 0,
      },
    ],
  };
}

// 長條圖組件
const ColumnChart = ({ data, color = "#42E82C" }) => {
  const chartOptions = {
    chart: {
      type: "column",
      height: "350px",
    },
    title: {
      text: "123",

      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#374151",
        visibility: "hidden", // 設置為隱藏
      },
    },
    xAxis: {
      categories: data.map((item) => item.name),
      crosshair: true,
      labels: {
        style: {
          fontSize: "12px",
          color: "#6B7280",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
        style: {
          fontSize: "12px",
          color: "#6B7280",
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:12px">{point.key}</span><br/>',
      pointFormat:
        '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}筆</b>',
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        color: color,
        borderRadius: 3,
      },
    },
    series: [
      {
        name: "已核准",
        data: data.map((item) => item.value),
        showInLegend: true,
      },
    ],
    legend: {
      enabled: true,
      align: "right",
      verticalAlign: "top",
      layout: "vertical",
      borderWidth: 1, // 設置邊框寬度
      borderColor: "#CCCCCC", // 設置邊框顏色
      backgroundColor: "#FFFFFF", // 設置背景顏色
    },
    credits: { enabled: false },
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

// 堆疊長條圖組件
const StackedColumnChart = ({ data, title }) => {
  const chartOptions = {
    chart: {
      type: "column",
      height: "350px",
    },
    title: {
      text: title,
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#374151",
        visibility: "hidden", // 設置為隱藏
      },
    },
    legend: {
      enabled: true,
      align: "right",
      verticalAlign: "top",
      // layout: "horizontal",
      borderWidth: 1, // 設置邊框寬度
      borderColor: "#CCCCCC", // 設置邊框顏色
      backgroundColor: "#FFFFFF", // 設置背景顏色
    },
    xAxis: {
      categories: data.map((item) => item.name),
      labels: {
        style: {
          fontSize: "12px",
          color: "#6B7280",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
        style: {
          fontSize: "12px",
          color: "#6B7280",
        },
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: "bold",
          color: "#374151",
        },
      },
    },

    tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat:
        '<span style="color:{point.color}">●</span> {series.name}: {point.y}筆<br/>',
      footerFormat: "總計: {point.total}筆",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
        },
        borderRadius: 2,
      },
    },
    series: [
      {
        name: "申請中",
        data: data.map((item) => item.inProgress),
        color: "#42E82C",
        dataLabels: {
          enabled: true,
          format: "{point.y}",
          style: {
            fontSize: "12px",
            fontWeight: "bold",
            color: "#374151",
          },
        },
      },
      {
        name: "已核銷",
        data: data.map((item) => item.completed),
        color: "#19A4B4",
        dataLabels: {
          enabled: true,
          format: "{point.y}",
          style: {
            fontSize: "12px",
            fontWeight: "bold",
            color: "#374151",
          },
        },
      },
    ],
    credits: { enabled: false },
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

function PolicyEffect() {
  const { data, loading, error } = useGoogleSheet({
    range: "0.數據",
    sheetId,
  });

  // 處理數據
  const processedData = data ? processApiData(data) : null;

  if (loading) {
    return <Loading />;
  }

  if (error !== null) {
    return <PageError />;
  }

  if (!processedData) {
    return (
      <div className="w-full flex flex-col items-center justify-center pt-[52px]">
        <PageTitle
          icon={PolicyIcon}
          iconClassName="w-[24px] h-[32px]"
          title="轉型成效數據"
        />
        <div className="text-center py-10">
          <p className="text-gray-500">暫無數據</p>
        </div>
        <FooterBgcImg />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center pt-[52px]">
      <PageTitle
        icon={PolicyIcon}
        iconClassName="w-[32px] h-[28px]"
        title="成效總覽"
      />
      <div className="text-right text-gray-500 text-sm mb-4">
        更新時間：
        {new Date().toLocaleString("zh-TW", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </div>
      <Row gutter={0} className="w-full">
        <Col xs={1} md={2} />
        <Col xs={22} md={20}>
          <div className="min-h-screen  py-8">
            <div className="max-w-7xl mx-auto px-4">
              {/* Donut 圖表 */}
              <Row gutter={[24, 24]} className="mb-8">
                <Col xs={24} lg={12}>
                  <ChartCard
                    title="申請進度總覽"
                    chartComponent={
                      <DonutChart
                        title="申請進度總覽"
                        series={[
                          {
                            name: "進度",
                            colorByPoint: true,
                            innerSize: "75%",
                            data: [
                              {
                                name: "已申請",
                                y: processedData.applicationOverview.completed,
                                color: "#42E82C",
                              },
                              {
                                name: "未申請",
                                y: processedData.applicationOverview.pending,
                                color: "#E7E7E7",
                              },
                            ],
                          },
                        ]}
                      />
                    }
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <ChartCard
                    title="申請核銷狀態"
                    chartComponent={
                      <DonutChart
                        title="申請核銷狀態"
                        series={[
                          {
                            name: "進度",
                            colorByPoint: true,
                            innerSize: "75%",
                            data: [
                              {
                                name: "已核銷",
                                y: processedData.approvalStatus.approved,
                                color: "#42E82C",
                              },
                              {
                                name: "申請中",
                                y: processedData.approvalStatus.inProgress,
                                color: "#E7E7E7",
                              },
                            ],
                          },
                        ]}
                      />
                    }
                  />
                </Col>
              </Row>
              <Row gutter={[24, 24]} className="mb-8">
                <Col xs={24} lg={12}>
                  <ChartCard
                    title="各區申請比例"
                    chartComponent={
                      <DonutChartNone
                        series={[
                          {
                            name: "各區申請",
                            colorByPoint: true,
                            innerSize: "75%",
                            data: processedData.districtApplication.map(
                              (district) => ({
                                name: district.name,
                                y: district.value,
                                color: district.color,
                              })
                            ),
                          },
                        ]}
                      />
                    }
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <ChartCard
                    title="每月申請狀態"
                    chartComponent={
                      <DonutChartNone
                        series={[
                          {
                            name: "每月申請",
                            colorByPoint: true,
                            innerSize: "75%",
                            data: processedData.monthlyApplication
                              .map((month) => ({
                                name: month.name,
                                y: month.value,
                                color: month.color,
                              }))
                              .filter((point) => point.y > 0),
                          },
                        ]}
                      />
                    }
                  />
                </Col>
              </Row>

              {/* 其他圖表 */}
              <Row gutter={[24, 24]} className="mb-8">
                <Col xs={24} lg={12}>
                  <ChartCard
                    title="申請平均核准日"
                    chartComponent={
                      <ColumnChart data={processedData.approvalDays} />
                    }
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <ChartCard
                    title="核銷平均請領日"
                    chartComponent={
                      <ColumnChart data={processedData.claimDays} />
                    }
                  />
                </Col>
              </Row>

              {/* 堆疊圖表和品牌圓餅圖 */}
              <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                  <ChartCard
                    title="各區核銷比例"
                    chartComponent={
                      <StackedColumnChart
                        data={processedData.districtApproval}
                        title="各區核銷比例"
                      />
                    }
                  />
                </Col>
                <Col xs={24} lg={12}>
                  <ChartCard
                    title="各品牌申請比例"
                    chartComponent={
                      <DonutChartNone
                        series={[
                          {
                            name: "各區申請",
                            colorByPoint: true,
                            innerSize: "75%",
                            data: processedData.brandApplication.map(
                              (item) => ({
                                name: item.name,
                                y: item.value,
                                color:
                                  {
                                    SYM三陽: "#2caffe",
                                    YAMAHA山葉: "#544fc5",
                                    eMOVING中華: "#fe6a35",
                                    eReady台鈴: "#fa4b42",
                                    Ionex光陽: "#6b8abc",
                                    AeonMOTOR宏佳騰: "#2ee0ca",
                                    Zau泓創綠能: "#feb56a",
                                    Gogoro睿能: "#d568fb",
                                    "PGO 摩特動力": "#feb56a",
                                  }[item.name] || "#feb56a", // 預設顏色
                              })
                            ),
                          },
                        ]}
                      />
                    }
                  />
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col xs={1} md={2} />
      </Row>

      <FooterBgcImg />
    </div>
  );
}

export default PolicyEffect;
