# OpenAI-API-Handling

OpenAI 및 호환 API Endpoint를 다루는 방법에 대해 공부하는 Repo입니다.

## 프로젝트 구성

Next.js, TypeScript, TailwindCSS, Motion을 사용하여 프로젝트 구성.
현재 비용 문제로 OpenAI API 대신 AkashChat API 사용 중이나, 유료화로 인해 추후 OpenAI API로 교체 예정

**[프로젝트 보기](https://apihandle.jmin.me)**

프로젝트 관리 용이성을 위해 Next.JS의 기본 페이지인 `page.tsx`에 모든 요소를 작성하는 대신 `components`폴더에 요소별 스크립트를 별도로 작성 후 `page.tsx`에 import하여 구성.

## Motion 라이브러리

Motion은 Framer-Motion 라이브러리의 후속 라이브러리이며, 웹 개발 시 애니메이션 적용에 매우 용이하다는 특징이 있다.
이 프로젝트에는 spring-animation 등 여러 자연스러운 애니메이션 적용을 위하여 motion을 채택하였다.

기본적으로 모든 html 태그에 적용이 가능하며,

```tsx
'use client' // Next.js 프로젝트에서 상호 작용 가능한 요소를 사용할 시 클라이언트 렌더링이 요구됨
import * as motion from 'motion/react-client'

export default function Motion() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="justify-items-center place-content-center text-center">
          Main Component
        </h1>
        <motion.button
          className="bg-blue-500 text-white px-4 py-2 rounded-full place-self-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Click Me
        </motion.button>
      </main>
    </div>
  )
}
```

해당 코드에서는 <button></button> 태그에 `motion` 태그를 적용하였음을 알 수 있다.
