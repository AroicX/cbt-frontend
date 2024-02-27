<script>
  export let numOfPages;
  export let range;
  export let current;
  export let onChange;
  function paginate(total, range, current) {
    if (current < 1 || current > total || range % 2 === 0 || range < 1)
      return [];

    if (total === 1) return [1];
    const arr = [];

    if (range > total) {
      for (let i = 1; i <= total; i++) {
        arr.push(i);
      }
      return arr;
    }

    if (current === 1) {
      let i = 1;
      while (i <= range + current) {
        arr.push(i);
        i++;
      }
      return [...arr, total];
    }
    const center = Math.floor(range / 2);
    if (current <= range) {
      for (let i = 1; i <= range + 1; i++) {
        arr.push(i);
      }
      return [...arr, total];
    } else if (total - current <= range) {
      for (let i = total - range; i <= total; i++) {
        arr.push(i);
      }
      return [1, ...arr];
    } else if (current < total) {
      for (let i = current - center; i <= current + center; i++) {
        arr.push(i);
      }
      return [1, ...arr, total];
    } else return [];
  }

  let page = current || 1;
  const onClick = async (pageNum) => {
    await onChange(pageNum);
    page = pageNum;
  };

  const next = async () => {
    if (page + 1 > numOfPages) {
      return (page = numOfPages);
    }
    await onChange(page + 1);
    return (page = page + 1);
  };

  const back = async () => {
    if (page - 1 < 1) {
      return (page = 1);
    }
    await onChange(page - 1);
    return (page = page - 1);
  };
  let paginationArr = paginate(numOfPages, range, page);
  $: if (current) {
    paginationArr = paginate(numOfPages, range, page);
  }
</script>

<div class="card-inner">
  <div class="nk-block-between-md g-3">
    <div class="g">
      <ul class="pagination justify-content-center justify-content-md-start">
        <li class="page-item" on:click={back}>
          <a class="page-link" href="#">Prev</a>
        </li>
        {#each paginationArr as num}
          <li class="page-item" on:click={() => onClick(num)}>
            <a class:current={page === num} class="page-link" href="#">{num}</a>
          </li>
        {/each}
        <li class="page-item" on:click={next}>
          <a class="page-link" href="#">Next</a>
        </li>
      </ul>
      <!-- .pagination -->
    </div>
  </div>
  <!-- .nk-block-between -->
</div>

<style>
  .current {
    background-color: #54bd9b;
    color: white;
  }
</style>
