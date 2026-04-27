import { CheckCircle } from '@solar-icons/react'
import Image from 'next/image'

interface Feature {
    title: string;
    body: string;
}

interface FeaturesSectionProps {
    title: string;
    description: string;
    features: Feature[];
    illustration?: React.ReactNode;
    reverse?: boolean;
}

export default function FeaturesSection({
    title,
    description,
    features,
    illustration,
    reverse = false
}: FeaturesSectionProps) {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid items-center gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-24">
                    <div className={`lg:col-span-2 ${reverse ? 'md:order-last' : ''}`}>
                        <div className="md:pr-6 lg:pr-0">
                            <h2 className="text-4xl font-semibold lg:text-5xl tracking-tight">{title}</h2>
                            <p className="mt-6 text-muted-foreground text-lg">{description}</p>
                        </div>
                        <ul className="mt-8 divide-y border-y *:flex *:items-start *:gap-3 *:py-4 border-zinc-100">
                            {features.map((feature, index) => (
                                <li key={index}>
                                    <div className="mt-1 bg-primary/10 rounded-full p-1 shrink-0">
                                        <CheckCircle weight="BoldDuotone" className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-zinc-900">{feature.title}</h3>
                                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{feature.body}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="border-border/50 relative rounded-3xl border p-3 lg:col-span-3">
                        <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700 overflow-hidden">
                            <div className="bg-zinc-50 w-full h-full rounded-[15px] flex items-center justify-center p-8 overflow-hidden">
                                {illustration || (
                                    <div className="text-zinc-400 text-sm italic">Flux Interface Preview</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
