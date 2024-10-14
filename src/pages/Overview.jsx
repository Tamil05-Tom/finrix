import React, { useRef } from 'react'
import { Filter, ArrowUp, ArrowDown } from 'lucide-react'
import Navbar from '../utils/Navbar'
import { summaryreport, doughnutData, doughnutoptions, invoiceData } from '../constant'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChatWidget from '../components/ChatWidget';
import CountUp from 'react-countup';

ChartJS.register(ArcElement, Tooltip, Legend);


function Overview() {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    console.log(e.target.files);
  }
  return (
    <div className=' bg-black max-h-full h-full'>
      <Navbar />
      <div className=' filter-container flex p-4 justify-between mb-4'>
        <div className=' text-2xl text-[#E5E5E5] font-bold'>Financial Overview</div>
        <div>
          <button className="flex items-center px-3 py-2 bg-[#EAEAEA] rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
            <Filter size={16} className="mr-2 font-semibold" />
            <span className=' font-semibold '>Filter</span>
          </button>
        </div>
      </div>
      <div className="flex space-x-4 bg-black p-4 rounded-xl cards-section">
        <FinancialCard title="Total Income" amount={788900} />
        <FinancialCard title="Total Expenses" amount={203900} />
        <FinancialCard title="Account Payable" amount={12003.92} />
        <FinancialCard title="Account Receivable" amount={12003.90} />
      </div>
      <div className=' flex p-3 gap-2'>
        <div className=' summary-report-section bg-[#1c1c1e] w-[50%] rounded-lg'>
          <div className=" p-8 pb-0 pl-4 pr-4">
            <h1 className="text-[#E5E5E5] text-2xl font-bold mb-6 text-center">Summary Report</h1>
            {summaryreport.map((section, index) => (
              <SummaryTable
                key={index}
                title={section.title}
                data={section.data}
                showExpand={section.showExpand}
              />
            ))}
          </div>
        </div>
        <div className=' flex flex-col w-[50%] gap-3  ml-2 '>
          <div className=' revenue-section bg-[#1c1c1e] rounded-lg'>
            <h1 className="text-[#E5E5E5] text-2xl font-bold mb-6 text-left pl-10 pt-6">Revenue</h1>
            <div className=' w-full flex justify-center'>
              <div className="w-[400px] h-[300px] flex justify-center items-center pt-2">
                <Doughnut data={doughnutData} options={doughnutoptions} />
              </div>
            </div>
            <h1 className="text-[#E5E5E5] text-2xl font-bold mb-6 text-left pl-10 pt-10">Latest Invoices</h1>
            <div className="bg-black p-6 rounded-lg m-4">
              <table className="w-full text-sm text-left text-gray-200">
                <thead className="text-xs uppercase text-gray-400">
                  <tr>
                    <th className="py-3 px-6">Customers</th>
                    <th className="py-3 px-6">Invoice Nr.</th>
                    <th className="py-3 px-6">Amount</th>
                    <th className="py-3 px-6">Invoice Date</th>
                    <th className="py-3 px-6">Aging</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.map((invoice, index) => (
                    <tr key={index} className="border-b border-gray-800">
                      <td className="py-4 px-6">{invoice.customer}</td>
                      <td className="py-4 px-6">{invoice.invoiceNr}</td>
                      <td className="py-4 px-6">
                      $<CountUp
              end={parseFloat(invoice.amount)}
              duration={2}
              separator=","
              decimals={2}
            />
                      </td>
                      <td className="py-4 px-6">{invoice.invoiceDate}</td>
                      <td className="py-4 px-6">{invoice.aging}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className=' file-upload-container h-full'>
            <div className="flex items-center justify-center  bg-[#1c1c1e] rounded-lg h-full">
              <div className="w-[400px] h-[300px] rounded-md flex flex-col items-center justify-center space-y-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-[#EAEAEA] text-black font-medium text-sm rounded hover:bg-[#3C3C3C] focus:outline-none focus:ring-2 focus:ring-[#3C3C3C] transition-colors duration-300 ease-in-out"
                >
                  Upload TB for instant P/L !
                </button>
                <p className="text-xs text-[#888888] tracking-[0.7px]">
                  Drag and drop or choose a file from your computer
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatWidget />
    </div>
  )
}


const FinancialCard = ({ title, amount, format = 'currency' }) => {
  const formatAmount = (value) => {
    if (format === 'currency') {
      if (value >= 1000) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }).format(value / 1000) + 'K';
      } else {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value);
      }
    }
    return value.toFixed(2);
  };

  return (
    <div className="bg-[#1c1c1e] text-[#E5E5E5] p-4 rounded-lg shadow-lg flex-1 min-w-[200px]">
      <h2 className="text-sm font-medium text-gray-400 mb-1">{title}</h2>
      <p className="text-2xl font-bold">
        <CountUp
          end={amount}
          duration={2}
          formattingFn={(value) => formatAmount(value)}
        />
      </p>
    </div>
  );
};

const SummaryTable = ({ title, data, showExpand }) => (
  <div className="bg-black rounded-lg overflow-hidden mb-4 shadow-lg relative">
    <div className="text-white text-sm font-semibold py-4 px-6 grid grid-cols-4 gap-x-4 opacity-80">
      <div>{title}</div>
      <div>Deviation</div>
      <div className="text-left">This Month</div>
      <div className="text-left">Last Month</div>
    </div>

    {data.map((item, index) => {
      const deviationValue = parseFloat(item.deviation.replace('%', '')); // Extract numeric value
      const isPositive = deviationValue > 2;

      return (
        <div
          key={index}
          className="text-gray-300 text-sm py-4 px-6 grid grid-cols-4 gap-x-4 items-center opacity-80 mb-2"
        >
          <div>{item.name}</div>
          <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <ArrowUp className="mr-1" size={15} /> : <ArrowDown className="mr-1" size={15} />}
            <CountUp
              end={deviationValue}
              duration={2}
              decimals={2}
              suffix="%"
            />

          </div>
          <div className="text-left"><CountUp
            end={parseFloat(item.thisMonth)}
            duration={2}
            separator=","
            decimals={2}
          /></div>
          <div className="text-left"><CountUp
            end={parseFloat(item.lastMonth)}
            duration={2}
            separator=","
            decimals={2}
          /></div>
        </div>
      );
    })}

    {showExpand && (
      <div className="absolute bottom-0 right-0 bg-white rounded-tl-lg overflow-hidden">
        <button className="text-black text-sm py-2 px-4 hover:bg-gray-100 transition-colors">
          Expand &gt;&gt;
        </button>
      </div>
    )}
  </div>
);


export default Overview