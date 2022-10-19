import { v4 as uuidv4 } from 'uuid';

//要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
    // 获取本地存储的数据，查看是否存在游客身份 uuid
    let uuid_tkoen = localStorage.getItem('UUIDTOKEN')

    // 判断是否存在uuid
    if (!uuid_tkoen) {
        // 如果不存在身份标识，则创建uuid
        uuid_tkoen = uuidv4()
        // 将创建的uuid存储到本地存储中
        localStorage.setItem('UUIDTOKEN', uuid_tkoen)
    }
    // 将uuid_token返回，否则值为undefined
    return uuid_tkoen
}