window.onload = function() {
    // store inital page in a dictionary
    var pages = {};
    pages[curPage] = $('#acc').html();

    $('#loader').addClass('hide');

    // enable tooltip
    var enable_tooltip = function() {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });
    }

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
                <img height="80" src=`+ user.image_url +`>
                `;
                
                $('#user-' + user.id).html(html);

                var tooltip = `
                <a href="` + user.url + `"> ` + user.username + `</a>
                <div> ` + user.about_me +`</div>
                <i class="fas fa-eye"></i><span>  ` + user.followers + ` </span>
                <i class="fas fa-users"></i> ` + user.followers + `
                <i class="fas fa-thumbs-up"></i>` + user.followers + `
                `;
                $('#user-' + user.id).attr('title', tooltip);

                enable_tooltip();
            });
            
            pages[curPage] = $('#acc').html();
            history.pushState({"html": $('#acc').html(), "pageTitle": "Hackaday Projects", "curPage": curPage}, 'Title of the page', "/projects/" +  curPage);
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

        if(pages[curPage - 1])
        {
            $("#acc").html(pages[curPage - 1]);
            curPage -= 1;

            enable_tooltip();

            history.pushState({"html": $('#acc').html(), "pageTitle": "Hackaday Projects", "curPage": curPage}, 'Title of the page', "/projects/" +  curPage);
        }
        else
        {
            $('#acc').html('');
            $('#loader').removeClass('hide');

            $.get('/projects/' + (curPage - 1), function(data) {
                $('#loader').addClass('hide');

                pages[curPage - 1] = data;
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

            enable_tooltip();

            history.pushState({"html": $('#acc').html(), "pageTitle": "Hackaday Projects", "curPage": curPage}, "", "/projects/" +  curPage);
        }
        else
        {
            $('#acc').html('');
            $('#loader').removeClass('hide');

            $.get('/projects/' + (curPage + 1), function(data) {
                $('#loader').addClass('hide');
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
        curPage = e.state.curPage;

        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });
    }
};