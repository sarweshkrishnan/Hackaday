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
                trHTML[index] += '<tr><td>' + item.name + '</td><td>' + item.summary + '</td><td>';
            });
            $('#project_table').append(trHTML[0]);
        }
        catch(err)
        {
            console.log('Error while rendering project: ', err)
        }
    })

}