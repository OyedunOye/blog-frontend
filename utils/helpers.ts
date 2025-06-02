export const getInitials = (fullName: string): string => {
  if (!fullName) return "";

  const words = fullName.trim().split(" ");
  const firstInitial = words[0]?.[0] || "";
  const secondInitial = words[1]?.[0] || "";

  return (firstInitial + secondInitial).toUpperCase();
};

export const wordLimit = (title: string): string =>{
  const numOfWords = title.trim().split(" ").length
  if (numOfWords > 6) {
    return title.split(" ").slice(0, 6).join(" ") + "..."
  } else {
    return title
  }
}

export const blogReadTime = (blogContent: string): string =>{
  const numOfWords = blogContent.trim().split(" ").length
  const read_time_min = Math.ceil(numOfWords/200).toFixed(0)
  return read_time_min
}

export const limContentToThirtyWords = (blogContent: string): string => {
  const numOfWords = blogContent.trim().split(" ").length;
  if (numOfWords > 20) {
    return blogContent.split(" ").slice(0, 30).join(" ") + "..."
  }
  return blogContent;
};