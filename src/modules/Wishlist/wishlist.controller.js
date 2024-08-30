import { User } from "../../../DataBase/model/user.model.js";
import { CatchError } from "../../middleware/CatchError.js";
import { AppError } from "../utils/App.Error.js";


// Add Wishlist
export const AddToWishlist = CatchError(async(req , res , next) =>
{
    let wishlist = await User.findByIdAndUpdate(req.User._id , {$addToSet:{Wishlist:req.body.Product}} , {new:true})

    wishlist || next (new AppError('Wishlist not found' , 404))
    wishlist || res.json({success:true , message:"Added wishlist Successfully" , wishlist})
})
// Remove wishlist
export const RemoveFromWishlist = CatchError(async(req , res  ,next) =>
{
    let wishlist = await User.findOneAndUpdate(req.User._id , {$pull: {Wishlist:req.params.id}} , {new:true})
    wishlist || next (new AppError('Wishlist not found' , 404))
    wishlist || res.json({success:true , message:"Remove wishlist Successfully" , wishlist})
})
// Get Logged User Wishlist
export const GetLoggedUserWishlist = CatchError(async(req , res  ,next) =>
{
    let wishlist = await User.findById(req.User._id).populate('Wishlist')
    wishlist || next (new AppError('Wishlist not found' , 404))
    wishlist || res.json({success:true , message:"Get wishlist Successfully" , wishlist})
})