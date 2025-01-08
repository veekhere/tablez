import StartSetup from '@components/start/start-setup';
import { ReactTyped } from 'react-typed';

export function Start() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center select-none'>
      <section className='h-full w-full flex flex-col flex-1 items-center justify-center select-none'>
        <div>
          <h1 className='text-5xl font-extrabold tracking-tight cursor-default lg:text-6xl'>.tablez</h1>
          <ReactTyped
            className='text-1xl font-extralight text-muted-foreground cursor-default lg:text-2xl w-96'
            strings={['Create', 'Configure', 'Template', 'Store in cloud', 'Store local']}
            loop={true}
            typeSpeed={80}
            backSpeed={80}
            backDelay={800}
            cursorChar='_'
          />
        </div>

        <StartSetup />
      </section>

      <div className='text-sm text-muted-foreground-extra p-2 cursor-default'>
        Open-source project by
        <span className='ml-2 italic'>@veekhere</span>
      </div>
    </main>
  );
}
