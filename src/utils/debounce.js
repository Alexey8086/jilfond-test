// функция отложенного выполения другой функции
// принимает функцию, которую надо выполнить с задержкой
// второй параметр - величина задержки
export function debounce(func, time) {
    let timeout
  
    return function (...args) {
      const context = this
  
      clearTimeout(timeout)
  
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, time)

    }
}