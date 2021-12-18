/* 
  1. 首先，ref能为简单类型的值生成一个形为 { value: T } 的包装，
  这样在修改的时候就可以通过 count.value = 3 去触发响应式的更新了
  2. ref支持嵌套后解包，只剩下最里层的Ref类型
  const count = ref(ref(ref(ref(2))))
*/

// 第一版，默认情况
{
  type Ref<T = any> = {
    value: T;
  };

  function ref<T>(value: T): Ref<T>;

  const count = ref(2);

  count.value;
}

// 第二版：如果传入给函数的 value 也是一个 Ref 类型呢？
{
  type Ref<T = any> = {
    value: T;
  };

  type UnwrapRef<T> = T extends Ref<infer R> ? UnwrapRef<R> : T;

  function ref<T>(value: T): T extends Ref ? T : Ref<UnwrapRef<T>>;

  const count = ref(ref(ref(3)));

  // 成功解包
  count.value; // number

  // 但对于这种情况，我们希望del.value.foo推断的类型是number，所以要增加对对象的支持
  const del = ref({
    foo: ref(2),
  });

  del.value.foo;
}

// 第三版：增加对对象的支持
{
  type Ref<T = any> = {
    value: T;
  };

  type UnwrapRef<T> = {
    ref: T extends Ref<infer R> ? UnwrapRef<R> : T;
    object: { [k in keyof T]: UnwrapRef<T[k]> };
  }[T extends Ref ? "ref" : "object"];

  function ref<T>(value: T): T extends Ref ? T : Ref<UnwrapRef<T>>;

  const count = ref(ref(ref(3)));

  // 成功解包
  count.value; // number

  const del = ref(
    ref({
      foo: ref(2),
      str: ref("abc"),
    })
  );

  // 正常推断噢
  del.value.foo;
  del.value.str;
}
