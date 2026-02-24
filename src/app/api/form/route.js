
import {NextResponse } from "next/server";


const User=[]
export async function GET(){
    return NextResponse.json(User)
}
export async function POST(request){
try {
    const body=await request.json()
    const {name,email,mobilenumber,gender}=body;

    const id=Math.random().toString(10).substring(2,7)
    const newUser={name,email,mobilenumber,gender,id}
    User.push(newUser)
    console.log(User)
    return NextResponse.json({
        message:"all data is posted"
    },
{status:200})
} catch (error) {
    return NextResponse.json({
        message:"fail to post "
    },{status:500})
}

}

export async function DELETE(request){
    try {
        const body=await request.json()
        const {id}=body;
        const value=User.findIndex((u)=>(u.id===id))
        if(value===-1){
            return NextResponse.json({
                message:"this page is not working"
            },{
                status:400
            })
        }
        User.splice(value,1)
        return NextResponse.json({
            message:"deleted succesfully"
        },{
            status:200
        })
    } catch (error) {
        return NextResponse.json({
            message:"Failed to delete"
        },{
            status:404
        })
    }
}

export async function PUT(request){
    try {
        const body=await request.json()
        const {name,email,mobilenumber,gender,id}=body;
        const value=User.findIndex((u)=>(u.email===email))
        if(value===-1){
            return NextResponse.json({
                message:"this is not working"
            },{
                status:400
            })
        }

        User[value]={name,email,mobilenumber,gender}
        return NextResponse.json({
            message:"upadted succesfully"
        },{
            status:200
        })
        
    } catch (error) {
        return NextResponse.json({
            message:"Failed to update user"
        },{
            status:404
        })
    }
}