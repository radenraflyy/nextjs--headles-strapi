import { getAllAccounts, getSelectedAccount } from "@/api/services"
import { Inter } from "next/font/google"
import Image from "next/image"
import NotFound from "./notFound"
import { useRouter } from "next/router"

const inter = Inter({ subsets: ["latin"] })

export default function SlugPage({ data }) {
  const Router = useRouter()
  if (!data) {
    Router.push("/notFound")
    return null
  }
  return (
    <main
      className={`flex min-h-screen max-w-2xl m-auto flex-col items-center p-4 pt-24 ${inter.className}`}
    >
      <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden mb-4">
        <Image
          className="relative"
          layout="fill"
          objectFit="cover"
          src={`${process.env.NEXT_PUBLIC_IMAGE}${data.attributes.photo.data.attributes.url}`}
          alt={data.attributes.fullname}
        />
      </div>
      <div className="flex flex-col items-center gap-2 w-full mb-12">
        <h3 className="text-2xl font-bold">{data.attributes.fullname}</h3>
        <p className="text-lg">{data.attributes.bio}</p>
      </div>

      <div className="flex flex-col items-center gap-8 w-full">
        {data.attributes.links.data.map((value, index) => {
          if (value.attributes.status === "radenactive") {
            return null
          } else if (value.attributes.status === "suspend") {
            return (
              <a
                key={index}
                className="h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[24px] p-4 hover:scale-105 transition-all cursor-pointer"
                href={
                  value.attributes.status === "suspend"
                    ? null
                    : value.attributes.url
                }
                target="_blank"
                rel="noopener noreferrer"
                disabled
              >
                {value.attributes.title}
              </a>
            )
          } else {
            return (
              <a
                key={index}
                className="h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[24px] p-4 hover:scale-105 transition-all cursor-pointer"
                href={value.attributes.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {value.attributes.title}
              </a>
            )
          }
        })}
      </div>
    </main>
  )
}

export async function getStaticPaths() {
  const accounts = await getAllAccounts()
  const dataAccounts = await accounts.data.data

  const paths = dataAccounts.map((value) => {
    return {
      params: { slug: value.attributes.slug },
    }
  })

  return { paths, fallback: "blocking" }
}

export async function getStaticProps({ params }) {
  const selectedAccount = await getSelectedAccount(params.slug)

  if (!selectedAccount.data.data[0]) {
    return {
      redirect: {
        destination: "/notFound",
        permanent: false,
      },
    }
  }

  return {
    props: {
      data: selectedAccount.data.data[0],
    },
    revalidate: 10,
  }
}
