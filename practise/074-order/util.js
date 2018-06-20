window.util= {
    find_index_by_id(arr, id) {
        return arr.findIndex( row => {
            return row.id == id;
        });
    },

    delete_element_by_index(arr, id) {
        let i = this.find_index_by_id(arr, id);
        arr.splice(i, 1);
    },
};