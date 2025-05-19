import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Iconapply from "@/assets/icon/icon-apply.png";
import IconCalendar from "@/assets/icon/icon-calendar.png";
import IconHuman from "@/assets/icon/icon-human.png";
import IconList from "@/assets/icon/icon-list.png";
import IconMoney from "@/assets/icon/icon-money.png";
import IconService from "@/assets/icon/icon-service.png";
import { Row, Col } from "antd";
import { useState } from "react";
import FooterBgcImg from "@/components/FooterBgcImg";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

function Description() {
  const [activeKeys, setActiveKeys] = useState({
    time: false,
    method: false,
    items: false,
    qualification: false,
    payment: false,
    service: false,
  });

  const handleToggle = (key) => {
    setActiveKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCollapseAll = () => {
    setActiveKeys({
      time: false,
      method: false,
      items: false,
      qualification: false,
      payment: false,
      service: false,
    });
  };

  const handleExpandAll = () => {
    setActiveKeys({
      time: true,
      method: true,
      items: true,
      qualification: true,
      payment: true,
      service: true,
    });
  };

  const collapseStyle = "mb-6 rounded-lg bg-[#e8fcfc]";

  const headerClassName =
    "flex items-center  justify-between cursor-pointer font-bold rounded-xl bg-gradient-to-b from-white to-[#ecfee8] border-[2px] border border-[#19a4b4] text-base px-[32px] py-[18px]  md:px-[80px] md:py-[24px]";
  const contentStyle =
    "px-[32px] py-[24px] md:px-[80px] md:py-[62px] bg-white/95 rounded-xl shadow-xl border border-[#eaf8fb]/30";
  const renderCollapseHeader = (icon, text, isActive) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={icon}
          alt={text}
          className="w-[26px] h-[26px] mr-4 md:mr-[40px]"
        />
        <span className="md:text-2xl text-base ">{text}</span>
      </div>
      <span className="md:text-2xl text-base ">
        {isActive ? <MinusOutlined className="text-2xl" /> : <PlusOutlined />}
      </span>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center justify-center pt-[52px]">
      <PageTitle title="規則說明" />

      <Row gutter={24} className="w-full">
        <Col xs={1} md={3} />
        <Col className="p-0" xs={22} md={18}>
          <div className="w-full  ">
            <div className="flex justify-end mb-2 text-sm text-teal-600">
              <button
                onClick={handleCollapseAll}
                className={`mr-2 ${
                  Object.values(activeKeys).some((key) => key)
                    ? "text-black"
                    : "text-gray-400"
                }`}
              >
                全部收合
              </button>{" "}
              |
              <button
                onClick={handleExpandAll}
                className={`ml-2 ${
                  Object.values(activeKeys).some((key) => key)
                    ? "text-gray-400"
                    : "text-black"
                }`}
              >
                全部展開
              </button>
            </div>

            <div className="bg-transparent">
              {/* 申請時間 */}
              <div className={collapseStyle}>
                <div
                  className={headerClassName}
                  onClick={() => handleToggle("time")}
                >
                  {renderCollapseHeader(
                    IconCalendar,
                    "申請時間",
                    activeKeys.time
                  )}
                </div>
                {activeKeys.time && (
                  <div className={contentStyle}>
                    <p className="font-bold text-[12px] md:text-[16px]">
                      申請日期即日起至
                      <span className="text-red-500 text-base md:text-2xl">
                        114年12月15日
                      </span>
                      止
                    </p>
                  </div>
                )}
              </div>

              {/* 申請方式 */}
              <div className={collapseStyle}>
                <div
                  className={headerClassName}
                  onClick={() => handleToggle("method")}
                >
                  {renderCollapseHeader(
                    Iconapply,
                    "申請方式",
                    activeKeys.method
                  )}
                </div>
                {activeKeys.method && (
                  <div className={contentStyle}>
                    <h2 className="text-xl font-bold  ">【紙本申請】</h2>
                    <h3 className="font-bold  mb-2">申請流程：</h3>
                    <p className="mb-2">
                      1.申請者應於本計畫公告期間，檢具下列文件1式1份交付本府審核：
                    </p>
                    <div className=" space-y-1">
                      <p>(1)補助申請表（附件2）。</p>
                      <p>(2)證明文件審核表（附件3）。</p>
                      <p>
                        (3)補助經費概算表(同一補助事項向二個以上機關提出申請補助，應於申請時列明全部經費內容及向各機關申請補助之項目及金額；本府將視各項金額補助該項目）（附件4）。
                      </p>
                      <p>(4)切結書（附件5）</p>
                      <p>
                        (5)設立登記相關證明文件：公司(商號)設立登記證明文件或工廠登記核准公文影本
                        (以合夥或設立公司方式創業者，並應另提出合夥契約書、股東名冊或公司組織章程)
                      </p>
                      <p>(6)最新一期一般營業人銷售額與稅額申報書。</p>
                    </div>
                    <p className="mb-4">
                      2.上述文件如為影本，需加蓋申請人（公司、商業）及負責人印鑑章（外國公司請加蓋訴訟及非訴訟代理人印鑑章），並註明「與正本相符」；本計畫核定名額及補助額度以受理先後及優先項目順序為之，如當年度預算用罄時，本府得停止受理補助申請。
                    </p>
                    <h3 className=" ">【收件資訊】</h3>
                    <ul className="list-disc list-inside">
                      <li className="">
                        <span className="-ml-3">
                          收件地址：(202)基隆市中正區信二路 299 號 4 樓
                        </span>
                      </li>
                      <li className="">
                        <span className="-ml-3">
                          收件單位：「基隆市政府產業發展處產業服務科」收
                        </span>
                      </li>
                      <li className="">
                        <span className="-ml-3">
                          連絡電話：基隆市產業發展處產業服務科 02-2428-9225
                        </span>
                      </li>
                      <li className="">
                        <span className="-ml-3">
                          備&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;註：信封請註明「申請「114
                          年度基隆市機車產業輔導綠能轉型產業補助計畫」
                        </span>
                      </li>
                    </ul>
                    <div className=" ">
                      【郵寄說明】申請者應於申請期限內完成「寄送紙本文件」(以郵戳為憑)，並請於寄件後於平日上班期間來電確認
                    </div>
                    <div className=" ">
                      【親送說明】親自送達者以本府收文登錄日期為憑
                    </div>

                    <div>
                      ※相關文件請至申請單據下載專區下載
                      <a
                        href=" /114-keelungEV/#/download"
                        className="text-blue-600 hover:underline"
                      >
                        (點我至申請單據下載專區)
                      </a>
                    </div>

                    <h2 className="text-xl mt-5 font-bold  ">【線上申請】</h2>
                    <h3 className="font-bold  mb-2">申請流程：</h3>
                    <div>
                      <p className="">1.線上填單</p>
                      <p className="">
                        申請者應於本計畫公告期間檢具下列文件，上傳至本網站申請補助專區並填寫相關資料進行申請，以利本府審核。
                      </p>
                      <div className="">
                        <p>(1)切結書（附件5）</p>
                        <p>
                          (2)設立登記相關證明文件：公司(商號)設立登記證明文件或工廠登記核准公文影本
                          (以合夥或設立公司方式創業者，並應另提出合夥契約書、股東名冊或公司組織章程)
                        </p>
                        <p>(3)最新一期一般營業人銷售額。</p>
                        <p>(4)稅額申報書。</p>
                        <p>(5)車行銀行存簿封面</p>
                        <p>(6)補助項目之相關證明文件（可後補）</p>
                      </div>
                      <div
                        className=" 
                "
                      >
                        <ul className="list-disc list-inside">
                          <li className="">
                            <span className="-ml-3">
                              「綠能轉型補助」中央完訓證書、車廠授權維修證明
                            </span>
                          </li>
                          <li className="">
                            <span className="-ml-3">
                              「留才獎勵補助」人員中央完訓證書、維修技術證書、任職就業證明
                            </span>
                          </li>
                          <li className="">
                            <span className="-ml-3">
                              「設備補助」發票+工具證明照片、廠牌認證維修系統租賃繳費證明
                            </span>
                          </li>
                        </ul>
                      </div>
                      <p className="">
                        ※上述文件需加蓋申請人（公司、商業）及負責人印鑑章（外國公司請加蓋訴訟及非訴訟代理人印鑑章），並註明「與正本相符」；本計畫核定名額及補助額度以受理先後及優先項目順序為之，如當年度預算用罄時，本府得停止受理補助申請。
                      </p>
                      <div>
                        <p className="">2.審核通過後</p>
                        <p className="">
                          申請完畢後，請各位業者下載下列檔案並自行填寫簽章，並於市府通知審核通過後，攜帶以下正本文件進行請領核銷作業
                        </p>
                        <div className="">
                          <p>(1)切結書影本(附件5)</p>
                          <p>(2)請領申請表(附件6-1)</p>
                          <p>(3)領據(附件7)</p>
                          <p>(4)車行存簿封面影本</p>
                          <p>(5)身分證(正/反面)影本</p>
                        </div>
                        <div>
                          <p className="">3.缺件補件</p>
                          <p className="">
                            申請者請於申請後於平日上班期間來電確認（基隆市產業發展處產業服務科
                            02-2428-9225）。如有缺件者，請於期限內至本網站「補件專區」進行補件。重新送件後將會有專人協助進行審查。
                          </p>
                        </div>
                        <div>
                          ※相關文件請至申請單據下載專區下載
                          <a
                            href=" /114-keelungEV/#/download"
                            className="text-blue-600 hover:underline"
                          >
                            (點我至申請單據下載專區)
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 補助項目 */}
              <div className={collapseStyle}>
                <div
                  className={headerClassName}
                  onClick={() => handleToggle("items")}
                >
                  {renderCollapseHeader(IconList, "補助項目", activeKeys.items)}
                </div>
                {activeKeys.items && (
                  <div className={contentStyle}>
                    <div className="mb-4">
                      本計畫補助期間為本市環保局「基隆市公益青年就業電動機車補助計畫
                      1.0」公告起訖日 112 年 09 月 12 日至 114 年 12 月 15
                      日(含)止。
                    </div>
                    <h2 className="text-xl font-bold  ">
                      【產業轉型支援補助】
                    </h2>
                    <h3 className="font-bold  ">(1)綠能轉型：</h3>
                    <p className="">
                      補助新臺幣（以下同）100,000元整。輔導傳統車行取得中央認可(經濟部、勞動部、環境部共同頒予之第一階段機車維修技術課程結訓證書)及各車廠電動車機車維修保養之授權認證。(※如無中央認可證書，
                      <a href="https://motor-training.cier.edu.tw/first-phase">
                        可先行由此報名網站進行報名
                      </a>
                      )
                    </p>

                    <h3 className="font-bold ">(2)留才獎勵：</h3>
                    <p className="">
                      補助20,000元整。獎勵車行所屬員工取得中央經濟部、勞動部、環境部共同頒予之第一階段機車維修技術課程結訓證書，及各廠牌認證之電動機車維修技術訓練證書。
                    </p>
                    <h3 className="font-bold  ">(3)設備補助：</h3>
                    <p className="">
                      補助80,000元整。輔導轉型機車行購置經濟部審查核定公告之保養維修診斷器材、維修系統租賃費，營運空間店面改造費及固定於建物之識別標誌定著物等項目。
                    </p>
                    <p>
                      <a href="https://www.lev.org.tw/shop/files/repairtools">
                        (※器材清單請參考此網址)
                      </a>
                    </p>

                    <h2 className="text-xl mt-2.5 font-bold  ">
                      【綠能交通產業推廣】
                    </h2>
                    <h3 className="font-bold ">(1)公益青年機車推廣：</h3>
                    <p className="mb-2">
                      每一代辦核准案件補助600元整。配合本市環保局「基隆市公益青年就業電動機車補助計畫」代辦窗口，協助受理民眾申請文件。
                    </p>
                    <h3 className="font-bold ">(2)中小企業圓夢貸款推廣：</h3>
                    <p className="mb-2">
                      每案申請核貸最高以100萬元為上限。需符合本府辦理「基隆市中小企業圓夢貸款」專案相關規定辦理。
                      <a href="https://reurl.cc/KdLDRM">
                        (https://reurl.cc/KdLDRM)
                      </a>
                    </p>
                    <h3 className="font-bold ">
                      (3)青年創業貸款利息補貼推廣：
                    </h3>
                    <p className="mb-2">
                      通過第二項中小企業圓夢貸款，且年齡在18-45歲之業者，即可申請「基隆市青年創業貸款利息補貼計畫」，貸款200萬元利息額度之補助。需符合本府辦理「基隆市青年創業貸款利息補貼計畫」專案相關規定辦理。
                      <a href="https://reurl.cc/Q5evv9">
                        (https://reurl.cc/Q5evv9)
                      </a>
                    </p>
                  </div>
                )}
              </div>

              {/* 補助資格 */}
              <div className={collapseStyle}>
                <div
                  className={headerClassName}
                  onClick={() => handleToggle("qualification")}
                >
                  {renderCollapseHeader(
                    IconHuman,
                    "補助資格",
                    activeKeys.qualification
                  )}
                </div>
                {activeKeys.qualification && (
                  <div className={contentStyle}>
                    <div>
                      <h2 className=" ">補助（合作）對象及資格條件</h2>

                      <h3 className="font-bold text-xl mt-4">【必要條件】</h3>
                      <div className="space-y-1">
                        <p>
                          (1)已依公司法或商業登記法完成設立登記，所經營之事業體，營業地址與稅籍應設於基隆市，或前述事業體經由基隆市機車商業同業公會推薦。
                        </p>
                        <p>
                          (2)限營業項目為機車零售或維修保養之獨資、合夥事業或法人並有稅籍登記者。
                        </p>
                      </div>

                      <h3 className="font-bold text-xl mt-4">【優先條件】</h3>
                      <p className="mb-4">
                        已通過「經濟部主辦機車行升級轉型輔導－機車維修訓練課程」，並取得經濟部、勞動部、環境部共同頒予之第一階段機車維修技術課程結訓證書。（若無該證書亦可先行申請）
                      </p>

                      <h3 className="font-bold text-xl">
                        【有下列情形之一者，視為不符申請資格】
                      </h3>
                      <div className="space-y-1">
                        <p>(1)申請人所經營事業之稅籍遷出基隆市。</p>
                        <p>(2)不符本計畫申請資格或補助條件。</p>
                        <p>
                          (3)檢具之申請或核銷資料虛偽不實、虛偽買賣、偽造、變造或重複請款等情事。
                        </p>
                        <p>(4)未親自經營所申請本計畫補助之事業者。</p>
                        <p>(5)經營不善或其他原因致停業或歇業。</p>
                        <p>(6)營業行為違反公共秩序善良風俗者。</p>
                        <p>
                          (7)留才獎勵之核准人員未於該車行就業連滿至少6個月，或另轉調他行重複申請補助。
                        </p>
                        <p>
                          (8)設備補助項目不符經濟部核定公告者及各車廠認可者，並有違補助遵循事項。
                        </p>
                        <p>(9)未依本計畫規定提出申請、核銷或逾期未完成核銷。</p>
                        <p>(10)規避、妨礙或拒絕本府派員查核。</p>
                        <p>(11)其他違反本計畫所訂事項及本府函知應遵守事項。</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 撥款程序 */}
              <div className={collapseStyle}>
                <div
                  className={headerClassName}
                  onClick={() => handleToggle("payment")}
                >
                  {renderCollapseHeader(
                    IconMoney,
                    "撥款程序",
                    activeKeys.payment
                  )}
                </div>
                {activeKeys.payment && (
                  <div className={contentStyle}>
                    <p className="mb-2">
                      申請者應於取得核准之次日起依照申請補助方案限制期限，完成申請改造項目或提升服務，並檢附下列文件及相關核銷文件1式1份交付本府審核：
                    </p>

                    <div className="space-y-1">
                      <p>(1)證明文件審核表（附件3）。</p>
                      <p>(2)產業轉型支援補助請領申請表（附件6-1）。</p>
                      <p>(3)綠能交通產業推廣請領申請表（附件6-2）。</p>
                      <p>(4)本計畫領據（附件7）。</p>
                      <p>
                        (5)補助函核准影本。（※僅首次核銷時須檢附，後續申請可不須再檢附）
                      </p>
                      <p>
                        (6)申請人為戶名之金融機構指定帳號存簿封面影本。（※僅首次核銷時須檢附，後續申請可不須再檢附）
                      </p>
                      <p>(7)其他佐證證明文件（※請參閱本計畫核定）。</p>
                    </div>

                    <div className="mt-4">
                      ※相關文件請至申請單據下載專區下載
                      <a
                        href="/114-keelungEV/#/download"
                        className="text-blue-600 hover:underline"
                      >
                        (點我至申請單據下載專區)
                      </a>
                    </div>
                  </div>
                )}
              </div>
              {/* 撥款程序 */}
              <div className={collapseStyle}>
                <div
                  className={headerClassName}
                  onClick={() => handleToggle("service")}
                >
                  {renderCollapseHeader(
                    IconService,
                    "服務諮詢窗口",
                    activeKeys.service
                  )}
                </div>
                {activeKeys.service && (
                  <div className={contentStyle}>
                    <p className="mb-2">有任何問題歡迎聯絡申辦諮詢窗口</p>

                    <div className="space-y-1">
                      <p>
                        <span className="font-bold">主辦單位</span>
                        ｜基隆市政府－產業發展處
                      </p>
                      <p>
                        <span className="font-bold">服務電話</span>
                        ｜02-2428-9225 廖小姐
                      </p>
                      <p>
                        <span className="font-bold">
                          LINE@&nbsp;&nbsp;&nbsp;
                        </span>
                        ｜
                        <a href="https://line.me/R/ti/p/@914kgwbz?oat_content=url&ts=04221721">
                          基隆綠能車行補助通
                        </a>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Col>
        <Col xs={1} md={3} />
      </Row>
      <FooterBgcImg />
    </div>
  );
}

export default Description;
