var list_product = {{list_all_product}}
console.log(list_product);
document.getElementById('Show').addEventListener('change', function() {
    if (this.value = 0) {
      for(let i = 0; i < Array(document.list_all_product).length; i++) {
        document.getElementById(String(i)).style.visibility = "visible";
      }
    } else {
      for(let i = Array(document.list_all_product).length - 1; i > Number(this.value); i--) {
        console.log(i)
        document.getElementById(String(i)).style.visibility = "hidden";
      }
    }
});
