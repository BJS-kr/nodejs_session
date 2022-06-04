/**
 * @BlockingIO_vs_Non_BlockingIO
 * function이 return되는 시점의 차이
 * Blocking: kernel(FS)가 처리완료 응답을 Process에게 반환할때까지 실행정지. 이후 완료 응답 수령시 return
 * non-blocking: kernel에게 처리를 맡긴 후 즉시 return. 운영체제(여기선 좁은 의미로 kernel)도 프로그램에 불과하므로, 다른 프로그램에게 작업을 맡겨버리고 자신은 notification만 기다리는 것.
 * ? blockingI/O, non-blockingI/O 성능차이가 있나요? 
 * * 알 수 없음. blockingI/O이던 non-blockingI/O이던 kernel이 작업을 수행하는 것은 동일함
 * ? FS외의 작업에서, nodejs의 Blocking과 Non-blocking은 어째서 일어나나요?
 * libuv가 handle하는 작업들은 정해져있습니다. fs, dns, zlib, crypto가 그것입니다.
 * kernel에 작업을 맡겨두고 return하는 것과 마찬가지로, libuv에게 작업을 맡겨놓고 return할 수도 있습니다.
 * 참고로 libuv는 이런 작업들을 처리하기 위해 thread pool을 생성하고 있으며 갯수는 4개입니다. (uv_threadpool 환경 설정을 통해 128개까지 설정가능)
 * 어떤 kernel에서도 지원하지 않는 작업을 네개 이상 비동기적으로 실행시키면 더이상 작업이 일어나지 않겠죠?
 * libuv는 우선 kernel이 처리할 수 있는 일은 kernel에게 맡겨버리니까요. kernel이 수행할 수 있는 작업의 한계는 시스템상, 컴퓨터의 스펙상 차이가 있을 것이므로
 * 정확히 어떤 작업을 몇 개나 비동기적으로 수행할 수 있는가? 에 대한 답변은 '상황에 따라 다름'이 됩니다.
 * ? nodejs에선 비동기 작업이 완료되었음을 어떻게 알 수 있나요?
 * file descriptor?
 */

/**
 * @비동기_처리란
 * * 동시 처리(IPC의 종류 및 메커니즘)
 * * 병렬 처리
 * 
 */

/**
 * @nodejs에서의_비동기_처리방식
 * ? 왜 싱글스레드에서 작업이 안 끝났는데 다른 작업 요청을 받을 수 있는가? 아니, 싱글스레드라는게 무엇인가?
 * 싱글스레드의 핵심은 콜스택이 하나라는 것이고, 콜스택이 하나라는 것은 스레드가 하나라는 것이며, 이는 한번에 하나의 작업만 수행이 가능하다는 뜻이다.
 * 콜 스택의 스택이 해제되는 조건은 return이 발생하는 것
 * 그렇다면 동기처리란 콜스택에 작업이 남아있는채로, return되지 않는 상태를 허용하는 것을 말한다고 할 수 있을 것이다.
 * 
 * OS커널(멀티스레드) 혹은 libuv의 thread pool(브라우저라면 WebAPIs)에게 blockingI/O 작업을 맡긴다. 
 * 즉, non-blocking이 가능한 것은 blockingI/O를 다른 프로그램에게 넘겼기 때문이다.
 * 즉, JS가 싱글스레드라는 것은 엄밀히 말하면 틀렸다.
 * 보통 싱글스레드라고 표현하는 이유는 이벤트루프가 싱글스레드기반으로 동작하기 때문이다.
 * 
 * 즉, js가 비동기를 지원한다기보다는 js의 런타임(브라우저 or Node)가 비동기를 지원한다고 보는 편이 타당하다.
 * libuv는 작업을 완료하면, js의 callstack에 작업을 넣는 것이 아니라 task-queue에 작업을 밀어 넣은 후, event-loop을 거쳐 js의 callstack에 삽입되는 순을 거친다.
 * 여기서 짚고 넘어가야할 부분은, callstack이 비었을 때만 eventloop가 태스크 큐의 작업을 콜스택으로 밀어넣으며, 이를 반복한다는 것이다.
 * 이는 생각해보면 당연한데, 콜스택이 비워지기 전에 새로운 태스크를 넣으면 콜스택의 작업이 실행이 되다가 갑자기 전혀 엉뚱한 연산이 이어서 실행되는 결과를 낳기 때문이다.
 * (what the heck is event loop는 event-loop가 태스크큐로부터 콜스택으로 밀어넣는 것만 설명하고 있지만, https://darrengwon.tistory.com/953 에서는 이벤트루프가 태스크 큐에 작업을 밀어넣고, 다시 이벤트루프가 태스크 큐의 작업을 콜스택으로 넘긴다고 설명하고있다. 무엇이 맞는것인가)
 * * event-loop
 * ! https://www.youtube.com/watch?v=8aGhZQkoFbQ
 * 
 * * libuv
 * 이 라이브러리는 C로 작성되었고 윈도우나 리눅스 커널을 추상화해서 Wrapping하고 있는 구조이다. 즉, libuv는 OS 커널에서 어떤 비동기 작업들을 지원해주는 지 알고 있기 때문에 커널을 사용하여 처리할 수 있는 비동기 작업을 발견하면 바로 커널로 작업을 넘겨버리고, OS가 지원하지 않는 비동기가 있다면 자체 thread pool을 이용하여 비동기를 처리합니다.
 */

/**
 * @왜_callback이_필요할까
 * * 어떤 작업이 완료된 후에 원하는 동작을 실행할 수 없을까?
 */

/**
 * @왜_JS는_callback_투성이일까
 * * 싱글스레드라서 거의 모든 동작을 비동기로 처리해야한다.
 * * don't block the event-loop
 */

/**
 * @callback의_진화_Promise
 * * microtask-queue(js9000으로 시연)
 * * microtask vs macrotask
 */

/**
 * @Promise의_진화_async_await
 */

/**
 * @유용한_비동기_처리_패턴
 * * reduce를 이용한 Promise 순차처리
 * ? 여러 비동기 작업을 동시에 실행시킬 순 없을까?
 * * callback을 이용한 병렬처리
 * * Promise.all을 이용한 병렬처리
 * * stream을 이용한 병렬처리
 * * worker_thread를 이용한 병렬처리
 */

/**
 * @Bonus
 * * 비동기를 다루는 라이브러리 'async'
 * * 데이터를 스트림으로 바라보자 'rxjs'
 */

// https://javascript.plainenglish.io/nodejs-thread-pool-performance-limitations-33e77811ff5b
// https://blog.insiderattack.net/javascript-event-loop-vs-node-js-event-loop-aea2b1b85f5c
// https://blog.insiderattack.net/new-changes-to-timers-and-microtasks-from-node-v11-0-0-and-above-68d112743eb3
// https://www.youtube.com/watch?v=8aGhZQkoFbQ&t=182s

// https://www.korecmblog.com/node-js-event-loop/
// https://medium.com/@mmoshikoo/event-loop-in-nodejs-visualized-235867255e81