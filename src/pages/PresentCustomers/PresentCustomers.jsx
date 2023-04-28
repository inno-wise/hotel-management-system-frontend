import React, { useEffect, useState } from 'react'

import './presentCustomers.css'

const PresentCustomers = () => {

  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const getResidents = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/user/getallresidents', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const result = await response.json();

        if (response.ok) {

          const data = result.users;

          setResidents(data);
        } else {
          throw new Error(`Failed to fetch data: ${result.message}`);
        }

      } catch (error) {
        alert(error.message);
      }


    }


    getResidents();
  }, [])

  // [{
  //   GSTIN_no: "1wsdf234",
  //   address: "Assam",
  //   booking_from: "2023-04-29T00:00:00.000Z",
  //   booking_to: "2023-05-15T00:00:00.000Z",
  //   company_name: "c1",
  //   date_of_booking: "2023-04-22T00:00:00.000Z",
  //   date_of_check_in: "2023-05-01T00:00:00.000Z",
  //   local_contact_number: "4321",
  //   name: "Sample Customer 1",
  //   phone_number: "1234",
  //   rate_negotiated: 1000,
  //   roomAllocatedStatus: true,
  //   room_no: { no: '101', id: '64468bfa6e6a961f41089b60' },
  //   room_type: { name: 'Type 1', id: '64467c2f0e7ff6d5f79d66d4' },
  //   user_foods: [],
  //   __v: 0,
  //   _id: "64469da085ae0ca1b27bda93"
  // }]

  function calculateDays(date1, date2) {
    const newDate1 = new Date(date1);
    const newDate2 = new Date(date2);

    const diffInMilliseconds = newDate2 - newDate1;
    const diffInSeconds = diffInMilliseconds / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;

    return Math.floor(diffInDays) + ' days';
  }

  return (
    <div>
      <h1>Customers in the Hotel</h1>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Room no.</th>
              <th>Phone no.</th>
              <th>Days spent</th>
            </tr>
          </thead>
          <tbody>
            {residents.map((user) => (
              <tr key={user.name}>
                <td>{user.name}</td>
                <td>{user.room_no.no}</td>
                <td>{user.phone_number}</td>
                <td>{calculateDays(user.date_of_check_in, new Date())}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default PresentCustomers