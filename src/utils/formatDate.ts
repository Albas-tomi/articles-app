import dayjs from "dayjs";

export const formatDate = (dateString: string) => {
  const trimmedDateString = dateString.replace(/(\.\d{3})\d+/, "$1");
  const parsedDate = dayjs(trimmedDateString);
  if (!parsedDate.isValid()) {
    console.error("Tanggal tidak valid");
  } else {
    const formattedDate = parsedDate.format("DD-MMMM-YYYY");
    return formattedDate;
  }
};
