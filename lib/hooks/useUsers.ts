
import { useState, useEffect } from "react"
// import { KnowledgePost } from "@/lib/generated/prisma"
export interface User {
  id       : string 
  name     : string
  email    : string   
  avatar   : string
  initials : string
  role     : string
  skills   : string[]
  location : string
  bio      : string
  department : string
  status: string
}
export interface UsersPaginated {
    users: User[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages:number;
    }
}
export function useUsers({page,limit,search,role,refresh

}:{
    page:number,
    limit:number,
    search?:string,
    role?:string,
    refresh?:any
}) {
  const [users, setUsers] = useState<UsersPaginated>()

  useEffect(() => {
    const fetchusers = async () => {
      let  url=`/api/user/list?page=${page}&limit=${limit}`;
      if (search) {
        url = url + `&search=${search}`;
      }
      if (role) {
        url = url + `&role=${role}`;
      }
      const res = await fetch(url)
      const data = await res.json()
      console.log("Data from users:", data)
      setUsers(data)
    }
    fetchusers()
  }, [page,limit,role,search,refresh])

  return users
}
