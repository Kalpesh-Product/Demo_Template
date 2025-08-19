import { ReactFitty } from "react-fitty";
import Container from "../../components/Container";
import GetStartedButton from "../../components/GetStartedButton";
import SaaSFeatureBlock from "../../components/SaaSFeatured";
import FinanceImage from "../../assets/images-service/finance-final.png";
import useIsMobile from "../../hooks/useIsMobile.js";
import FrontendImage from "../../assets/images-service/frontend-2.png";
import TicketsImage from "../../assets/images-service/meetings-final.jpeg";
import SalesImage from "../../assets/images-service/sales-final.png";
import HrImage from "../../assets/images-service/hr-img-2.jpeg";
import {
  customerProfile,
  mobileSite,
  notifications,
  templates,
  paymentGateway,
  website,
  taxesFA,
  budgetFA,
  projectionsFA,
  cashflowFA,
  invoicingFA,
  emailMarketingSM,
  socialMediaSM,
  leadGenerationSM,
  eSignHR,
  templatesHR,
  performanceHR,
  payslipsHR,
  payrollHR,
  attendanceHR,
  visitorCM,
  meetingRoomsCM,
  ticketRaisingCM,
  income,
  expense,
  reports,
  calendar,
  seo,
  calendarLine,
  bookingEngineCM,
  aiSeoCM,
  inventory,
  occupancy,
  clientManagement,
  profitLoss,
  jobs,
  employeeManagement,
} from "../../assets/icon_service_color";
import { useNavigate } from "react-router-dom";

export default function Modules() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  return (
    <Container>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-8">
          <div className="text-center">
            <h1 className="text-[clamp(1.7rem,3.8vw,5rem)] text-start lg:hidden lg:text-start font-semibold font-comic">
              The ONLY Nomad Ecosystem SaaS Platform!
            </h1>
            <div className="font-semibold font-comic hidden lg:flex w-full">
              <ReactFitty >
                The ONLY Nomad Ecosystem SaaS Platform!
              </ReactFitty>
            </div>
          </div>
          <div>
            <h4 className="text-lg lg:text-[1.8rem] lg:leading-[2.75rem] text-start md:text-center lg:text-start ">
              No Code Website <span className="text-primary-blue"></span>
              <span className="text-primary-blue">+</span> Booking Engine{" "}
              <span className="text-primary-blue">+</span> Payment Gateway{" "}
              <span className="text-primary-blue">+</span> Accounting{" "}
              <span className="text-primary-blue">+</span> Reports{" "}
              <span className="text-primary-blue">+</span> Analytics{" "}
              <span className="text-primary-blue">+</span> HR Support{" "}
              <span className="text-primary-blue">+</span> Customer & Client
              Management <span className="text-primary-blue">+</span> Marketing
              and more.
            </h4>
          </div>
          <div className="flex justify-end items-end">
            <GetStartedButton
              title="Get Started"
              handleSubmit={() => navigate("/hosts/signup")}
            />
          </div>
        </div>

        <hr className="border-t-4" />
      </div>
      <div className=" flex flex-col gap-4 py-0 lg:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
          <div className=" flex flex-col gap-2">
            <div className="flex flex-col relative text-card-title md:text-3xl font-medium my-3 w-full">
              Real-time operations
              <img
                src="/blue-line.png"
                alt="greenUnderLine"
                className="w-3/4 md:w-1/4 h-6"
              />
            </div>
            {isMobile && (
              <div className="SaaS-featured-grid-right h-[30vh] md:h-[35vh] lg:h-[50vh] overflow-hidden border-gray-100 border-[1px] p-2 rounded-lg">
                <img
                  className="h-full w-full object-cover"
                  src={FinanceImage}
                  alt="ServiceGridImage"
                />
              </div>
            )}
            <span className="text-lg md:text-xl lg:text:2xl">
              Manage your business in real-time across all business verticals.
            </span>
            <span className="text-lg md:text-xl lg:text:2xl">
              Operate your business in real-time with the micro most details of
              inventory, bookings, accounts, analytics, leads, sales, reports,
              tasks, logs, menu, complaints, requests etc.
            </span>
          </div>
          {!isMobile && (
            <div className="SaaS-featured-grid-right h-[30vh] md:h-[35vh] lg:h-[50vh] overflow-hidden border-gray-100 border-[1px] p-2 rounded-lg">
              <img
                className="h-full w-full object-cover"
                src={FinanceImage}
                alt="ServiceGridImage"
              />
            </div>
          )}
        </div>
        <hr
          className="h-[1px] text-gray-500 bg-gray-500 mb-2
         lg:mt-10"
        />
      </div>
      <Container padding={false}>
        <div data-aos="fade-up" className="flex flex-col gap-8">
          <SaaSFeatureBlock
            title="Frontend"
            description1={[
              { title: "No Code Website", image: website },
              { title: "Booking Engine", image: bookingEngineCM },
              { title: "Payment Gateway", image: paymentGateway },
              { title: "Lead Management", image: leadGenerationSM },
              { title: "AI SEO", image: aiSeoCM },
              { title: "Notifications", image: notifications },
            ]}
            image={FrontendImage}
            width={"100%"}
            imageFit={"fill"}
            mobileHeight={"11rem"}
            imagePosition={"left top"}
            rowReverse={false}
          />
          <hr />
          <SaaSFeatureBlock
            title="Apps"
            description1={[
              { title: "Tickets", image: ticketRaisingCM },
              { title: "Tasks", image: customerProfile },
              { title: "Meeting Rooms", image: meetingRoomsCM },
              { title: "Visitors", image: visitorCM },
              { title: "Assets", image: eSignHR },
              { title: "Calendar", image: calendar },
            ]}
            image={TicketsImage}
            rowReverse={true}
          />
          <hr />
          <SaaSFeatureBlock
            title="Sales"
            description1={[
              { title: "Revenue Reports", image: reports },
              { title: "Lead Generation", image: leadGenerationSM },
              { title: "Sales Inventory", image: inventory },
              { title: "Occupancy", image: occupancy },
              { title: "Manage Clients", image: clientManagement },
              { title: "Profiling", image: customerProfile },
            ]}
            image={SalesImage}
            rowReverse={false}
          />
          <hr />
          <SaaSFeatureBlock
            title="Finance"
            description1={[
              { title: "P&L Report", image: profitLoss },
              { title: "Cashflow", image: cashflowFA },
              { title: "Invoicing", image: invoicingFA },
              { title: "Collections", image: projectionsFA },
              { title: "Historical Data", image: taxesFA },
              { title: "Budgeting", image: expense },
            ]}
            image={FinanceImage}
            imageFit={"cover"}
            rowReverse={true}
          />
          <hr />
          <SaaSFeatureBlock
            title="Human Resources"
            description1={[
              { title: "Manage Employees", image: employeeManagement },
              { title: "Payroll", image: payrollHR },
              { title: "Attendance", image: attendanceHR },
              { title: "Budgeting", image: expense },
              { title: "Performance", image: performanceHR },
              { title: "Jobs", image: jobs },
            ]}
            image={HrImage}
            rowReverse={false}
          />
        </div>
      </Container>
      <hr />
      <div className="flex justify-center w-full my-16">
        <GetStartedButton
          title={"Get Started"}
          handleSubmit={() => navigate("/hosts/signup")}
        />
      </div>
      <hr />
    </Container>
  );
}
