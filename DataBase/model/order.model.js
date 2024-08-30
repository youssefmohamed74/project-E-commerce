import mongoose, { Types } from "mongoose";

//Schema
const OrderSchema = new mongoose.Schema
({
    User:{type:Types.ObjectId , ref:'User'},
    OrderItems:
            [{
                Product:{type:Types.ObjectId , ref:'Product'},
                Quantity:Number,
                Price:Number,
            }],
    TotalOrderPrice:Number,
    ShippingAddress:
                {
                    city:String,
                    street:String,
                    phone:String
                },
    PaymentType:
                {
                    type:String,
                    enum:['Cash' , 'Card'],
                    default:'Cash'
                },
    IsPaid:
            {
                type:Boolean,
                default:false
            },
    PaidAt:Date,
    IsDelivered:
            {
                type:Boolean,
                default:false
            },
            
    DeliveredAt:Date
},
{
    timestamps:true , versionKey:false
})

//model
export const Order = mongoose.model('Order' , OrderSchema)