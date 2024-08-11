const nameToSlug = (name: string) => {
  return name.split(" ").join("-");
};

export default nameToSlug;
