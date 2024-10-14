import React, { useState, useEffect } from 'react'
import { logout } from '../auth/firebase';
import Navbar from '../utils/Navbar';
import { Filter, ArrowUpRight, ChevronDown } from 'lucide-react';
import { statsData, tabData, graphData, piedata, piecircledata, alerts } from '../constant';
import { BarChart, Bar, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Cell, Pie } from 'recharts'
import { Info } from 'lucide-react';
import ChatWidget from '../components/ChatWidget';
import { Doughnut } from 'react-chartjs-2';
import CountUp from "react-countup";
import { useSpring, animated } from 'react-spring';



function Dashboard() {

  const [activeTab, setActiveTab] = useState('expenses')
  const [selectedPeriod, setSelectedPeriod] = useState('7days')
  const COLORS = ['#646be1', '#d9dcff'];
  const [selectedTab, setSelectedTab] = useState('All')
  const { number } = useSpring({
    from: { number: 0 },
    number: parseFloat(tabData[activeTab].amount.replace(/[^0-9.-]+/g, "")),
    config: { mass: 1, tension: 64, friction: 7 }
  });

  const doughnutData = {
    labels: piecircledata.map(item => item.name),
    datasets: [
      {
        data: piecircledata.map(item => item.value),
        backgroundColor: COLORS,
        borderColor: COLORS,
        borderWidth: 1,
      },
    ],
  };


  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '50%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.parsed;
            return `${label}: ${new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value / 100)}`;
          }
        }
      }
    },
  };

  return (
    <div className=' bg-[#000000] min-h-screen text-white p-4'>
      <Navbar />
      <div className=' bg-black'>
        <div className=' filter-container flex p-4 justify-between mb-4'>
          <div className=' text-2xl text-white font-bold'>Dashboard</div>
          <div>
            <button className="flex items-center px-3 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
              <Filter size={16} className="mr-2 font-semibold" />
              <span className=' font-semibold'>Filter</span>
            </button>
          </div>
        </div>
        <div className=' flex'>
          <div className=' dashboard-wrapper flex w-full'>
            <div className=' chart-container w-[70%]'>
              <div className=' stats-wrapper flex justify-between p-3'>
                {statsData.map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
              </div>
              <div className=' graph-wrapper grid grid-cols-1 p-3'>
                <div className="bg-[#1c1c1e] p-6 rounded-lg">
                  <div className="p-6">
                    <div className="flex mb-4 border-b border-[#2c2f36]">
                      {Object.keys(tabData).map((tab) => (
                        <button
                          key={tab}
                          className={`text-sm font-medium px-4 py-2 bg-transparent border-none relative cursor-pointer ${activeTab === tab ? 'text-[#5e72e4]' : 'text-gray-400'
                            }`}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                          {activeTab === tab && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5e72e4]" />
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <p className="text-2xl font-bold m-0">
                          $<animated.span>
                            {number.to(n => n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
                          </animated.span>
                        </p>
                        <p className="text-[#4cd964] text-sm mt-1 mb-0">
                          <CountUp
                            start={0}
                            end={parseFloat(tabData[activeTab].change)}
                            duration={2}
                            decimals={2}
                            suffix="%"
                            prefix="↑"
                          />
                        </p>
                      </div>
                      <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="bg-transparent border border-[#2c2f36] text-white px-3 py-2 rounded text-sm"
                      >
                        <option value="7days">Last 7 days</option>
                        <option value="30days">Last 30 days</option>
                        <option value="90days">Last 90 days</option>
                      </select>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart
                        data={graphData[activeTab]}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2c2f36" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} />
                        <Tooltip content={<CustomTooltip />} />
                        <defs>
                          <linearGradient id={`color${activeTab}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={tabData[activeTab].color} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={tabData[activeTab].color} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke={tabData[activeTab].color}
                          fillOpacity={1}
                          fill={`url(#color${activeTab})`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>
              <div className=' piechart-wrapper p-3'>
                <div className="bg-[#1c1c1e] p-6 rounded-lg">
                  <div className=" items-center mb-4 inline-flex">
                    <h2 className="text-lg font-semibold text-white">P/L Comparison</h2>
                    <button className="text-white hover:text-gray-300">
                      <ChevronDown size={20} />
                    </button>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={piedata} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#9CA3AF' }}
                          dy={10}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#9CA3AF' }}
                          tickFormatter={formatYAxis}
                          dx={-10}
                        />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '4px' }}
                          itemStyle={{ color: '#fff' }}
                          formatter={(value) => [`$${value}k`, '']}
                        />
                        <Legend
                          align="right"
                          verticalAlign="top"
                          iconType="circle"
                          wrapperStyle={{ paddingBottom: '20px' }}
                        />
                        <Bar dataKey="profit" fill="#818CF8" radius={[4, 4, 0, 0]} maxBarSize={40} />
                        <Bar dataKey="loss" fill="#4B5563" radius={[4, 4, 0, 0]} maxBarSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="alerts-container flex flex-col p-3 w-[30%] space-y-6">
              <div className="pie-circle-container bg-[#1c1c1e] w-full rounded-lg flex-shrink-0" style={{ height: '240px' }}>
                <div className="label-wrapper flex justify-between p-4 w-full">
                  <label className="text-base text-white tracking-[0.8px]">Cash Balance / Investment</label>
                  <Info size={20} className="text-white opacity-70" />
                </div>
                <div className=' pb-4' style={{ height: '180px' }}>
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                </div>
              </div>
              <div className="alerts-wrapper w-full flex-grow bg-[#1c1c1e] rounded-lg overflow-hidden">
                <div className="text-white p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Alerts</h2>
                    <Info className="w-5 h-5" />
                  </div>
                  <div className="flex space-x-4 mb-6 border-b border-gray-700">
                    {['All', 'Revenue', 'Expenses'].map((tab) => (
                      <button
                        key={tab}
                        className={`py-2 px-4 text-sm font-medium transition-colors relative ${selectedTab === tab
                          ? 'text-blue-500'
                          : 'text-gray-400 hover:text-white'
                          }`}
                        onClick={() => setSelectedTab(tab)}
                      >
                        {tab}
                        {selectedTab === tab && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100% - 120px)' }}>
                    {alerts.map((alert, index) => (
                      <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
                        <p className="font-medium">{alert.title}</p>
                        <p className="text-sm text-gray-400">{alert.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatWidget />
    </div>
  )
}

export default Dashboard

const StatCard = ({ icon, percentage, label, value, illustration }) => (
  <div className="bg-[#1c1c1e] text-white p-4 rounded-lg w-56 shadow-lg relative">
    <div className="flex justify-between items-start mb-4">
      <div className="bg-black p-2 rounded">
        {icon}
      </div>
      <div className="flex items-center text-green-400 text-sm">
        <ArrowUpRight className="w-3 h-3 mr-1" />
        <span>
          <CountUp
            end={parseFloat(percentage)}
            duration={2}
            decimals={2}
            suffix="%"
          />
        </span>
      </div>
    </div>
    <div className="text-gray-400 text-sm mb-2">{label}</div>
    <div className="text-2xl font-bold">
      $<CountUp
        end={parseFloat(value.replace(/[^0-9.-]+/g, ""))}
        duration={2}
        separator=","
        decimals={2}
      />
    </div>
    {/* {illustration && (
      <img 
        src={illustration} 
        alt="Illustration" 
        className="absolute bottom-2 right-2 w-16 h-16 opacity-50"
      />
    )} */}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: '#3a3f4b', color: 'white', padding: '8px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <p style={{ fontSize: '14px', margin: '0' }}>{label}</p>
        <p style={{ fontSize: '16px', fontWeight: 'bold', margin: '4px 0 0' }}>${payload[0].value}</p>
      </div>
    )
  }
  return null
}

const formatYAxis = (value) => {
  if (value >= 1000) return `$${value / 1000}k`
  return `$${value}`
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

