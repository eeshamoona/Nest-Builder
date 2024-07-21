const formatBirthday = (birthdayString: Date | null | undefined): string => {
  if (!birthdayString) return "No birthday provided";
  const birthday = new Date(birthdayString);
  const formattedBirthday = birthday.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  return `${formattedBirthday} (${age} years old)`;
};

const getAge = (birthDateString: string) => {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export { formatBirthday, getAge };
