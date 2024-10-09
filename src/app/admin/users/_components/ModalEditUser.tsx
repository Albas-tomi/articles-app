"use client";
import CustomInput from "@/components/Input/CustomInput";
import Modal from "@/components/Modal/Modal";
import axios from "axios";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const ModalEditUser = ({
  setShowModal,
  dataUser,
  id,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  dataUser: any;
  id: string;
}) => {
  const [formData, setFormData] = useState({
    first_name: dataUser?.first_name || "",
    last_name: dataUser?.last_name || "",
    email: dataUser?.email || "",
    role: dataUser?.role || "",
    username: dataUser?.username || "",
  });
  const router = useRouter();
  const token = Cookies.get("token");

  // Handle update user
  const handleUpdateUser = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`,
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Update user successfully");
        setShowModal(false);
        router.refresh();
      }
    } catch (error) {
      toast.error("Update user failed");
      console.log(error);
    }
  };

  return (
    <Modal height="h-[90%]" width="w-[80%]">
      <button
        onClick={() => setShowModal(false)}
        className="absolute p-0   btn btn-link top-1 right-4 text-black"
      >
        <CgClose className="text-xl" />
      </button>
      <div className="p-8">
        <h1 className="w-full text-center text-2xl font-semibold">Edit User</h1>
        <form onSubmit={handleUpdateUser} className="w-4/5 mx-auto">
          <CustomInput
            label="Username"
            type="text"
            value={formData.username}
            placeholder="Username"
            id="username"
            disable={true}
            name="username"
            onChange={(e: any) => {
              return setFormData({
                ...formData,
                username: e.target.value,
              });
            }}
          />
          <CustomInput
            label="First Name"
            type="text"
            value={formData.first_name}
            onChange={(e: any) => {
              return setFormData({
                ...formData,
                first_name: e.target.value,
              });
            }}
            placeholder="First Name"
            id="firstname"
            name="firstname"
          />
          <CustomInput
            label="Last Name"
            value={formData.last_name}
            onChange={(e: any) => {
              return setFormData({
                ...formData,
                last_name: e.target.value,
              });
            }}
            type="text"
            placeholder="Last Name"
            id="lastname"
            name="lastname"
          />
          <CustomInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e: any) => {
              return setFormData({
                ...formData,
                email: e.target.value,
              });
            }}
            placeholder="Email"
            id="email"
            name="email"
          />

          <button className="mt-3  btn btn-primary w-full" type="submit">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalEditUser;
