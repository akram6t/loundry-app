import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
import { monthNames, URL_GET_INCOME_CHART } from '../../utils/Constant';
import RainBowProgressBar from '../Other/RainBowProgressBar';

const OrderChart = (props) => {
     const [loading, setLoading] = useState(false);
     const [year, setYear] = useState(new Date().getFullYear());
     const [chartData, setChartData] = useState(
          {
               labels: [],
               datasets: []
          });                    
     const [ totalAmount, setTotalAmount ] = useState(0);

     function replaceToMonthName(label) {
          return monthNames[label - 1];
     }

     useEffect(() => {
          const fetchData = async () => {
               setLoading(true);
               try {
                    const response = await axios.get(`${URL_GET_INCOME_CHART}/${year}`);
                    const { data } = await response.data;

                    if (!data[0]) {
                         setTotalAmount(0);
                         setChartData({
                              labels: [],
                              datasets: [],
                         });
                    } else {

                         const labels = data.map((item) => replaceToMonthName(item.month)) || [];
                         const amounts = data.sort().map((item) => (parseInt(item.total.totalAmount) + parseInt(item.total.addonPrice) + parseInt(item.total.serviceFee))) || [];
                         setTotalAmount(amounts?.reduce((acc, amount) => acc + amount));
                         setChartData({
                              labels,
                              datasets: [
                                   {
                                        label: `Total Amounts`,
                                        data: amounts,
                                        backgroundColor: '#808FFF',
                                        borderColor: 'rgba(75,192,192,1)',
                                        borderWidth: 1,
                                   },
                              ],
                         });

                    }
                    setLoading(false);
               } catch (err) {
                    setLoading(false);
                    console.error(err);
               }
          };

          fetchData();
     }, [year]);

     const handleYearChange = (e) => {
          setYear(parseInt(e.target.value));
     };


     const options = {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 2,
     };

     if (loading) {
          return (
               <div className={`widgetCard p-3 md:py-4 md:px-6 ${props.className}`}>
                    <RainBowProgressBar />
               </div>
          )
     }

     return (
          <div className={`widgetCard p-3 md:py-4 md:px-6 ${props.className}`}>
               <div className="flex items-center justify-between">
                    <div>
                         <h1 className="text-medium font-semibold pb-4">Income Statement</h1>
                         {totalAmount > 0 && (<h3>Total income <span className='text-purple-700 font-semibold'>₹{totalAmount}</span> in <span className='text-purple-700 font-semibold'>{year}</span></h3>)}
                    </div>
                    <select className='rounded p-2' value={year} onChange={handleYearChange}>
                         {[...Array(3)].map((_, index) => (
                              <option key={index} value={new Date().getFullYear() - index}>
                                   {new Date().getFullYear() - index}
                              </option>
                         ))}
                    </select>
               </div>
               {!chartData.labels[0] && (
                    <div className={`mt-2 text-red-500 p-3 md:py-4 md:px-6 ${props.className}`}>
                         <h1 className='text-xl font-semibold'>No orders in { year }</h1>
                    </div>
               )}
               <div className="">
                    <Bar data={chartData} options={options} />
               </div>
          </div>
     );
};

export default OrderChart;