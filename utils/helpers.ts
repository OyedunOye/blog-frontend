export const getInitials = (fullName: string): string => {
  if (!fullName) return "";

  const words = fullName.trim().split(" ");
  const firstInitial = words[0]?.[0] || "";
  const secondInitial = words[1]?.[0] || "";

  return (firstInitial + secondInitial).toUpperCase();
};
