export const getInitials = (fullName: string): string => {
  if (!fullName) return "";

  const words = fullName.trim().split(" ");
  const firstInitial = words[0]?.[0] || "";
  const secondInitial = words[1]?.[0] || "";

  return (firstInitial + secondInitial).toUpperCase();
};

export const wordLimit = (title: string): string => {
  const numOfWords = title.trim().split(" ").length;
  if (numOfWords > 6) {
    return title.split(" ").slice(0, 6).join(" ") + "...";
  } else {
    return title;
  }
};

export const blogReadTime = (blogContent: string): string => {
  const numOfWords = blogContent.trim().split(" ").length;
  const read_time_min = Math.ceil(numOfWords / 200).toFixed(0);
  return read_time_min;
};

export const limContentToThirtyWords = (blogContent: string): string => {
  const numOfWords = blogContent.trim().split(" ").length;
  if (numOfWords > 20) {
    return blogContent.split(" ").slice(0, 30).join(" ") + "...";
  }
  return blogContent;
};

export const obscureMail = (email: string) => {
  const splittedMail = email.split("@");
  const emailProper = splittedMail[0];
  const domain = splittedMail[1];

  return `${emailProper.substring(0, 3).concat("*******@")}${domain
    .substring(0, 1)
    .concat("****")}.${domain.split(".")[1]}`;
};

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};
