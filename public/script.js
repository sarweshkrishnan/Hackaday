window.onload = function() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    // store inital page in a dictionary
    var pages = {};
    pages[curPage] = $('#acc').html();

    // get all user ids
    var get_user_info = function() {
        var user_ids = '';
        $('.user').each(function(i, obj) {
            user_ids += obj.id.substring(5) + ',';
        })

        // make api call to fetch user data
        $.get('/users/batch?ids=' + user_ids, function(data) {
            $.each(data.users, function(i, user) {
                var html = `
                <img height="90" style="float:left; margin-right: 10px;" src=`+ user.image_url +`>
                <div>
                <a href="` + user.url + `"> ` + user.username + `</a>
                <div> ` + user.about_me + `</div>
                </div>
                `;
                $('#user-' + user.id).html(html );
            });
            
            pages[curPage] = $('#acc').html();
            history.pushState({"html": $('#acc').html(), "pageTitle": "Hackaday Projects"}, 'Title of the page', "/projects/" +  curPage);
        });
    }
    
    // get user info
    get_user_info();

    // handle prev button clicks
    $('.pagination li#prev').on("click", function() {
        if(curPage == 1)
        {
            return;
        }

        history.pushState({"html": $('#acc').html(), "pageTitle": "Hackaday Projects"}, "", "/projects/" +  curPage);

        if(pages[curPage - 1])
        {
            $("#acc").html(pages[curPage - 1]);
            curPage -= 1;

            history.pushState({"html": $('#acc').html(), "pageTitle": "Hackaday Projects"}, 'Title of the page', "/projects/" +  curPage);
        }
        else
        {
            $.get('/projects/' + (curPage - 1), function(data) {
                pages[curPage - 1] = data
                
                $("#acc").html(pages[curPage - 1]);
                curPage -= 1;
                
                get_user_info();
            });
        }
    });

    $('.pagination li#next').on("click", function() {

        if(pages[curPage + 1])
        {
            $("#acc").html(pages[curPage + 1]);
            curPage += 1;

            history.pushState({"html": $('#acc').html(), "pageTitle": "Hackaday Projects"}, 'Title of the page', "/projects/" +  curPage);
        }
        else
        {
            $.get('/projects/' + (curPage + 1), function(data) {
                pages[curPage + 1] = data
                
                $("#acc").html(pages[curPage + 1]);
                curPage += 1;

                get_user_info();
            });
        }
    });
}

// handle browser navigation
window.onpopstate = function(e){
    if(e.state){
        $('#acc').html(e.state.html);
        document.title = e.state.pageTitle;
    }
};