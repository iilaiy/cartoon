export default url => {
  // images为相对路径
  // 第二个参数:当前路径的URL
  return new URL(`../assets/images/${url}`, import.meta.url).href
}
