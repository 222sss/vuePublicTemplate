const views = import.meta.glob('../views/**/**.vue')
const layout = import.meta.glob('../layout/index.vue')
const rebuildFn = (val) => {
  const routerList = arrToMap(
    val.map((item) => {
      return {
        path: item.menuBackUrl,
        name: item.menuName,
        meta: { title: item.menuName, icon: item.menuIcon },
        parentId: item.parentId,
        menuId: item.menuId,
        component: item.parentId
          ? views[`../views${item.menuBackUrl}/index.vue`]
          : layout['../layout/index.vue']
      }
    })
  )

  return routerList
}

// 数组转树状结构
let map
const arrToMap = (arr) => {
  map = new Map()
  for (const index in arr) {
    const item = arr[index]
    item.children = []
    map.set(item.menuId, item)
  }

  const res = arr.filter((item) => item.parentId === 0)
  for (const index in arr) {
    const item = arr[index]
    if (item.parentId === 0) continue
    const parent = map.get(item.parentId)
    parent.children.push(item)
    item.parent = parent
  }
  return res
}

export default rebuildFn
