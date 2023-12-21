
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ProductCard from "../components/ProductsList/ProductCard"

const productMock = {
  id: 19,
  title: "Opna Women's Short Sleeve Moisture",
  price: 7.95,
  category: "women's clothing",
  description:
    "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
  image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
  rating: {
    rate: 4.5,
    count: 146
  }
}

const addToCartMock = jest.fn()

describe("ProductCard", () => {
  test("deve renderizar com o título, imagem, preço e botão de comprar", () => {
    render(<ProductCard
      product={productMock}
      addToCart={addToCartMock}
    />)

    const img = screen.getByAltText(/Opna Women's Short Sleeve Moisture/i)
    expect(img).toBeInTheDocument()

    const title = screen.getByRole(
      'heading', { name: /Opna Women's Short Sleeve Moisture/i })
    expect(title).toBeInTheDocument()

    const price = screen.getByText(/\$7\.95/i)
    expect(price).toBeInTheDocument()

    const buyButton = screen.getByRole('button', { name: /buy/i })
    expect(buyButton).toBeInTheDocument()
  })

  test("deve chamar a função de inserir no carrinho ao clicar no botão de comprar", async () => {
    const user = userEvent.setup()

    render(<ProductCard
      product={productMock}
      addToCart={addToCartMock}
    />)

    const buyButton = screen.getByRole('button', { name: /buy/i })
    await user.click(buyButton)

    expect(addToCartMock).toHaveBeenCalledTimes(1)
    expect(addToCartMock).toHaveBeenCalledWith(productMock)
  })
})