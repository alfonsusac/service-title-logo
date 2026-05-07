import { Dialog } from "radix-ui"
// import { VariantWithAuthor } from "./data"
import { Link } from "next-view-transitions"
import Image from "next/image"
import { cn } from "lazy-cn"
import { forwardRef, Ref, useState } from "react"
import { makeTransition } from "./VariantCard"
import { ThemeDropdown } from "./ThemeChanger"
import { button } from "./AppButton"
import toast from "react-hot-toast"
import type { EntryWithAuthor } from "./data"
import { IcRoundDownload, IcRoundFileCopy, MdiCircleMedium } from "./Icons"
// import Link from "next/link"

const VariantDialogContent = forwardRef(
  function VariantDialogContent(props: {
    // variant: VariantWithAuthor,
    entry: EntryWithAuthor,
    onClose: () => void
  }, ref: Ref<HTMLDivElement>) {
    const hasVariants = props.entry.images.length > 1
    const firstImage = props.entry.images[ 0 ]
    const [ selectedImageIndex, _setSelectedImageIndex ] = useState(0)
    // const [ variantTitle, _setVariant ] = useState(firstImage.label)

    const setSelectedImageIndex = makeTransition(_setSelectedImageIndex)

    const selectedImage = props.entry.images[ selectedImageIndex ]

    console.log(selectedImage)
    // const variant = props.entry.images.find((file) => file.title === variantTitle) || firstImage

    return (
      <Dialog.Content className="z-[30] top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2 
           w-full max-w-screen-lg p-8 
          h-full md:h-auto
          flex flex-col md:justify-center items-start
          font-display text-theme-text tracking-wider 
          "
        style={{
          // viewTransitionName: `dialog-content`,
        }}
        ref={ref}
      >
        <div className="
      bg-theme-card rounded-2xl shadow-2xl w-full p-8 relative my-auto overflow-auto
      ">
          <Dialog.Close className="top-0 absolute right-0 m-4 p-3 px-5 text-lg rounded-xl hover:bg-theme-card">
            X
          </Dialog.Close>
          <div className="flex flex-col md:flex-row gap-8 w-full pt-10 md:pt-0">
            <div className=" flex flex-col flex-none md:flex-1 gap-2">
              <div className="flex-none relative aspect-video w-full overflow-hidden rounded-2xl
            bg-theme-cardHover p-4 transition-all shadow-inner
          "
                style={{
                  overflow: selectedImage.style?.objectFit === 'contain' ? 'visible' : 'hidden',
                }}
              >
                <div className="absolute top-2 right-2 h-10 z-10 flex rounded-bl-lg">
                  <ThemeDropdown />
                </div>
                <div className="relative w-full h-full mt-18">
                  <Image
                    unoptimized src={selectedImage.src} alt={selectedImage.label ?? ""} title={selectedImage.label}
                    fill style={{
                      objectFit: selectedImage.style?.objectFit,
                    }}
                    className={cn(`object-contain transition-all group-hover:scale-110 rounded-lg`)}
                  />
                </div>
              </div>
              {
                hasVariants && (
                  <div className="h-20 bg-theme-cardHover shadow-inner
              flex items-stretch gap-2 overflow-auto rounded-xl p-2">
                    {
                      props.entry.images.map((image, index) => {
                        return (
                          <div key={index} className="h-full aspect-video flex-none relative
                       rounded-lg p-1 cursor-pointer transition-all
                      "
                            data-selected={index === selectedImageIndex}
                            onClick={() => {
                              setSelectedImageIndex(index)
                            }}
                          >
                            <MdiCircleMedium className="absolute top-0 left-0 text-transparent data-[selected=true]:text-theme-strong"
                              data-selected={index === selectedImageIndex}
                            />
                            <div className="w-full h-full relative">
                              <Image
                                unoptimized src={image.src} alt={image.label ?? ""} title={image.label}
                                fill
                                className={cn(`object-contain transition-all group-hover:scale-110`)}
                              />
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              }
              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    // TODO: actually download the image
                    async function toDataURL(url: string) {
                      const blob = await fetch(url).then(res => res.blob())
                      return URL.createObjectURL(blob)
                    }

                    const a = document.createElement("a")
                    a.href = await toDataURL(selectedImage.src)
                    a.download = selectedImage.label ?? props.entry.title
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)

                  }}
                  className={button('group flex-1 bg-theme-cardHover hover:bg-theme-bg')}
                >
                  <IcRoundDownload
                    className="flex-none text-2xl group-hover:text-theme-strong" />
                  Download
                </button>
                <button
                  className={button('group flex-1 bg-theme-cardHover hover:bg-theme-bg')}
                  onClick={async () => {
                    try {
                      // TODO: show toaster 
                      const img = await fetch(selectedImage.src)
                      const imgBlob = await img.blob()
                      const clipboardData = [ new ClipboardItem({ [ imgBlob.type ]: imgBlob }) ]
                      await navigator.clipboard.write(clipboardData)
                      toast.success('Image copied to clipboard!')
                    } catch (error) {
                      console.log(error)
                      toast.error('Failed to copy image to clipboard!')
                    }
                  }}
                >
                  <IcRoundFileCopy className="flex-none text-2xl group-hover:text-theme-strong" />
                  Copy
                </button>
              </div>
            </div>
            {/* RIGHT */}
            <div className="flex flex-col flex-none md:flex-1 text-lg">
              <header>
                <Dialog.Title className="text-theme-stronger text-3xl">{props.entry.title}</Dialog.Title>
                <Dialog.Description>by{' '}
                  <Dialog.Close>
                    <Link
                      href={`/${ props.entry.author.displayName }`}
                      className="text-theme-strong hover:underline"
                      onClick={() => {
                        props.onClose()
                      }}
                    >{props.entry.author.displayName}</Link>
                  </Dialog.Close>
                </Dialog.Description>
              </header>
              {
                hasVariants && <section className="pt-4">
                  <div className="text-base">Variants:</div>
                  <div className="flex flex-col mt-1">
                    {
                      props.entry.images.map((file, index) => {
                        return (
                          <div
                            key={index}
                            className="p-2 px-3 hover:bg-theme-cardHover -mx-3 -my-1 rounded-xl
                        data-[selected=true]:text-theme-strong
                        flex gap-2 items-center cursor-pointer transition-all
                        "
                            data-selected={index === selectedImageIndex}
                            onClick={() => setSelectedImageIndex(index)}
                          >
                            <MdiCircleMedium className="text-transparent data-[selected=true]:text-theme-strong"
                              data-selected={index === selectedImageIndex}
                            />
                            {file.label}
                          </div>
                        )
                      })
                    }
                  </div>
                </section>
              }
              <section className="flex flex-col gap-2 flex-grow justify-end mt-4">
                {
                  selectedImage.references[ 0 ] &&
                  <Link href={selectedImage.references[ 0 ].url} className={button('group hover:bg-theme-cardHover')}
                    onClick={props.onClose}
                  >
                    Visit File Source <span className="group-hover:text-theme-strong">{'>'}</span>
                  </Link>
                }
                <Link href={`/${ props.entry.author.displayName }`} className={button('group hover:bg-theme-cardHover')}
                  onClick={props.onClose}
                >
                  Visit Author <span className="group-hover:text-theme-strong">{'>'}</span>
                </Link>
              </section>
            </div>
          </div>
        </div>

      </Dialog.Content>
    )
  }
)

export default VariantDialogContent





