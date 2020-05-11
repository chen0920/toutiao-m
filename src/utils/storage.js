/**
 * 本地存储封装
 */

export const getItem = name => {
  const data = window.localStorage.getItem(name)
  // 为什么把JSON.parse放到try-catch中
  // 因为data 可能不是json 格式字符串
  try {
    // 尝试把data 转为javascript 对象
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

export const setItem = (name, value) => {
  // 如果value 是对象，就把value 转为JSON格式字符串再储存
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
