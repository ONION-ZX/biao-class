window.util = {
    find_index_by_id(arr, id) {
        return arr.findInder(row => {
            return row.id == id;
        });
    },

    delete_element_by_id(arr, id) {
        let i = this.find_index_by_id(arr, id);
        arr.splice(i,1);
    }
}