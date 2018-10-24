// ====================
// Project: menu
// 00-00-2017: Альберт
// ---------------------
// Открытие меню
// ====================
if ($('.js-accordion-parent').length > 0) {
    $('.js-open-burger').on("click", function() {
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
            $(".js-menu-container").removeClass("open");
            $(".js-scroll").removeClass('no-scroll no-touch windows');
        } else {
            $(this).addClass("open");
    
            $(".js-menu-container").addClass("open");
    
            // // Проверяем операционную систему на Win и Скролл
            // if ((windowsOS) && (getScroll('Height', '.b-page-wrapper'))) {
            //     $page.addClass('windows');
            // }
    
            $(".js-scroll").addClass('no-scroll');
    
            // if (window.innerWidth >= 320 && window.innerWidth < 768) {
            //     if ($(".js-list-destination").hasClass('active')) {
            //         $(".js-list-destination").removeClass('active');
            //     }
            // }
        }
    })
}