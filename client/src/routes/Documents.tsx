import FixedImage from "../components/FixedImage";

const Documents = () => {
    return (
        <div class="flex w-full flex-col items-center justify-center">
            <FixedImage url="/competition/documents.webp">
                <h1 class="font-futur text-white text-center text-6xl" style="word-spacing: 100vw;">Documents</h1>
            </FixedImage>
            <div class="h-full w-full flex flex-row items-center justify-center p-4 gap-4 font-futur text-xl font-bold">
                <a href="/doc/Plan de partenariat 2025 FR.pdf" target="_blank" class="bg-green-400 p-4 rounded-xl">Plan de partenariat FR</a>
                <a href="/doc/Plan de partenariat 2025 EN.pdf" target="_blank" class="bg-green-400 p-4 rounded-xl">Sponsorship Plan EN</a>
            </div>
        </div>
    )
};

export default Documents;
