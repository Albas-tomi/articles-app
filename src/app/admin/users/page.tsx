"use client";
import React, { useState } from "react";
import { MdDelete, MdEditRoad } from "react-icons/md";
import ModalEditUser from "./_components/ModalEditUser";
import axios from "axios";
import Cookies from "js-cookie";
import useSWR from "swr";
import { fetcherWithToken } from "@/lib/swr/fetcher";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AdminUsers = () => {
  const [showModal, setShowModal] = useState(false);
  const [idSelected, setIdSelected] = useState("");
  const [dataEdit, setDataEdit] = useState({});
  const router = useRouter();
  const token: any = Cookies.get("token");

  // Fetch data users
  const {
    data: users,
    error,
    isLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
    fetcher: (url: string) => fetcherWithToken(url, token),
    revalidateOnFocus: false, // Tidak melakukan revalidasi saat tab mendapatkan fokus
    revalidateOnReconnect: true, // Melakukan revalidasi saat koneksi internet kembali
    refreshInterval: 60000, // Revalidasi setiap 60 detik (1 menit)
    dedupingInterval: 2000, // Mencegah permintaan ganda dalam 2 detik
    errorRetryCount: 3, // Jumlah percobaan maksimum jika shouldRetryOnError true
  });

  // Delete user
  const handleDeleteUser = async (id: string) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 204) {
        toast.success("Delete user successfully");
        router.refresh();
      }
    } catch (error) {
      toast.error("Delete user failed");
      console.log(error);
    }
  };

  if (error) {
    return (
      <div className="text-red-600 text-xl h-full  flex justify-center items-center">
        Error fetching data
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-xl h-full  flex justify-center items-center">
        <span className="loading text-blue-500 loading-infinity min-w-16"></span>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="table table-md">
        <thead>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: any, index: number) => (
            <tr key={user.id}>
              <th>{index + 1}</th>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td className="flex gap-2  text-center justify-start items-center">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="btn p-0 btn-link text-black"
                >
                  <MdDelete className="text-xl text-red-600" />
                </button>
                <button
                  onClick={() => {
                    setShowModal(true);
                    setIdSelected(user.id);
                    setDataEdit(user);
                  }}
                  className="btn p-0 btn-link text-black"
                >
                  <MdEditRoad className="text-xl text-yellow-300" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <ModalEditUser
          setShowModal={setShowModal}
          dataUser={dataEdit}
          id={idSelected}
        />
      )}
    </div>
  );
};

export default AdminUsers;
