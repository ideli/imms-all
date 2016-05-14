window.extending({
    'layoutInit':function (){
        $('.accordion-header').click(function(){
            $('.accordion-header').removeClass('accordion-header-selected');
            $(this).addClass('accordion-header-selected');
        });
        $('.accordion-collapse').click(function(){
            $('.accordion-header').removeClass('accordion-header-selected');
            $(this.parentNode.parentNode).addClass('accordion-header-selected');
        });
        var toggleTag=$('#toggle-tag');
        var treeMenu=$('#tree-menu');
        var content=$('#content')

        //content.width(window.width-185);
        $('body').css('visibility','visible');
        var collapsed=false;
        toggleTag.click(function(){
            if(collapsed){
                treeMenu.width(170).find('.accordion').fadeIn();
                //content.width(window.width-185);
                toggleTag.html('◄')
            }else{
                treeMenu.find('.accordion').hide(),treeMenu.width(1);
                // content.width(window.width-16);
                toggleTag.html('▶')
            }
            collapsed=!collapsed;
        });
    }
});