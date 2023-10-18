import OrderedProduct from "@/components/MyPage/OrderedProduct"
import Profile from "@/components/MyPage/Profile"

function MyPage() {
  return (
    <>
      <Profile/>
      <section className="flex flex-col gap-3 mx-auto max-w-3xl mt-6">
        <h2 className="text-lg font-semibold">주문 내역</h2>
        <OrderedProduct/>
        <OrderedProduct/>
      </section>
      
    </>
  )
}

export default MyPage