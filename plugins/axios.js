// 此时调用方法为 Message(options)。我们也为每个 type 定义了各自的方法，如 Message.success(options)。并且可以调用 Message.closeAll() 手动关闭所有实例。
import { Message } from 'element-ui'

export default function({$axios,redirect}){
    $axios.onError(err=>{
        const {statusCode,message}=err.response.data;
        if(statusCode===400){
            Message.warning(message)
        }
    })

}