export const template = `
        <h4 class="header-grid row-1"> Title</h4>
        <h4 class="header-grid row-1"> Description</h4>
        <h4 class="header-grid row-1"> Price</h4>
        <h4 class="header-grid row-1"> Thumbnail</h4>
        <h4 class="header-grid row-1"> Code</h4>
        <h4 class="header-grid row-1"> Stock</h4>
        <h4 class="header-grid row-1"> Id</h4>
        <h4 class="header-grid row-1"> Status</h4>
        <h4 class="header-grid row-1"> Category</h4>
        <%for(let i=0; i<data.length; i++){%>
            <p class="item-1"><%=data[i].title%></p>
            <p class="item-2"><%=data[i].description%></p>
            <p class="item-3"><%=data[i].price%></p>
            <p class="item-4"><%=data[i].thumbnail%></p>
            <p class="item-5"><%=data[i].code%></p>
            <p class="item-6"><%=data[i].stock%></p>
            <p class="item-7"><%=data[i].id%></p>
            <p class="item-8"><%=data[i].status%></p>
            <p class="item-9"><%=data[i].category%></p>
        <%}%>`;
