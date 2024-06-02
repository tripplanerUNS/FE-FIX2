import React, { useState } from 'react';
import './Transaksi.css';
import Footer from "../Footer/Footer";

const Transaksi = () => {
  const [orderData, setOrderData] = useState({
    nama: '',
    nomorTelepon: '',
    email: '',
    alamat: '',
  });

  const [employeeData, setEmployeeData] = useState([{
    nama: '',
    nomorTelepon: '',
    email: '',
    jabatan: '',
  }]);

  const [paymentDetails, setPaymentDetails] = useState({
    metodePembayaran: '',
    pesan: '',
    totalPembayaran: 0,
  });

  const handleOrderDataChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmployeeDataChange = (index, e) => {
    const newEmployeeData = employeeData.map((employee, empIndex) => {
      if (index === empIndex) {
        return { ...employee, [e.target.name]: e.target.value };
      }
      return employee;
    });
    setEmployeeData(newEmployeeData);
  };

  const handlePaymentDetailsChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Order Data:', orderData);
    console.log('Employee Data:', employeeData);
    console.log('Payment Details:', paymentDetails);
  };

  const addEmployeeForm = () => {
    setEmployeeData([...employeeData, {
      nama: '',
      nomorTelepon: '',
      email: '',
      jabatan: '',
    }]);
  };

  return (
    <div className="transaction-form">
      <h2>TRANSACTION</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Orderer data:</legend>
          <label>
            Nama:
            <input type="text" name="nama" value={orderData.nama} onChange={handleOrderDataChange} />
          </label>
          <label>
            Nomor telepon:
            <input type="text" name="nomorTelepon" value={orderData.nomorTelepon} onChange={handleOrderDataChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={orderData.email} onChange={handleOrderDataChange} />
          </label>
          <label>
            Alamat:
            <input type="text" name="alamat" value={orderData.alamat} onChange={handleOrderDataChange} />
          </label>
        </fieldset>
        
        {employeeData.map((employee, index) => (
          <fieldset key={index}>
            <legend>Tambah karyawan</legend>
            <label>
              Nama:
              <input type="text" name="nama" value={employee.nama} onChange={(e) => handleEmployeeDataChange(index, e)} />
            </label>
            <label>
              Nomor telepon:
              <input type="text" name="nomorTelepon" value={employee.nomorTelepon} onChange={(e) => handleEmployeeDataChange(index, e)} />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={employee.email} onChange={(e) => handleEmployeeDataChange(index, e)} />
            </label>
            <label>
              Jabatan:
              <input type="text" name="jabatan" value={employee.jabatan} onChange={(e) => handleEmployeeDataChange(index, e)} />
            </label>
          </fieldset>
        ))}
        
        <button type="button" onClick={addEmployeeForm}>Tambah karyawan</button>
        
        <fieldset>
          <legend>Rincian pembayaran</legend>
          <label>
            Metode pembayaran:
            <input type="text" name="metodePembayaran" value={paymentDetails.metodePembayaran} onChange={handlePaymentDetailsChange} />
          </label>
          <label>
            Pesan:
            <textarea name="pesan" value={paymentDetails.pesan} onChange={handlePaymentDetailsChange}></textarea>
          </label>
          <p>Total pembayaran: Rp. {paymentDetails.totalPembayaran}</p>
          <button type="submit">Buat Pesanan</button>
        </fieldset>
      </form>
      
      < Footer />
    </div>
  );
};

export default Transaksi;
