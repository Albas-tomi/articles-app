import axios from "axios";
import Cookies from "js-cookie";

const token: any = Cookies.get("token");

export const fetchUsers = async (token: string): Promise<any> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data pengguna");
  }
  const data = await res.json();
  console.log(data);
  return data.users;
};

export async function getStaticArticles() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const articles = res.data;

  return {
    props: { articles },
    revalidate: 750, // Revalidate setiap 750 detik untuk pembaruan konten
  };
}
