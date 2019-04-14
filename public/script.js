window.onload = function() {  

    $.get('/api/projects', function(data){
        console.log(data)
        try
        {
            var trHTML = ['', '', '', '', ''];
            index = -1
            $.each(data.projects, function (i, item) {
                if(i % 10 == 0) {
                    index += 1
                }
                var summary = item.summary;
                summary = summary.length > 100 ? 
                    summary.substring(0, 100) + "..." : summary;

                accordian = `
                    <div class="panel-group">
                        <div class="panel panel-default">
                        <a data-toggle="collapse" href="#collapse${i}">
                            <div class="panel-heading">
                                <h4 class="panel-title">
                                    <span class="project-title">${item.name}:</span> <span class="project-summary">${summary}</span>
                                </h4>
                            </div>
                        </a>

                        <div id="collapse${i}" class="panel-collapse collapse">
                            <div class="panel-body">Panel Body</div>
                            <div class="panel-footer">Panel Footer</div>
                        </div>
                        </div>
                    </div> 
                    `
                $('#acc').append(accordian)
            });
            
            $('#collapse0').removeClass('collapse')
        }
        catch(err)
        {
            console.log('Error while rendering project: ', err)
        }
    })

}