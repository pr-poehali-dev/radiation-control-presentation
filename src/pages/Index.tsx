import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface Slide {
  id: number;
  title: string;
  content: string;
  icon: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Область применения',
    content: 'Нормы радиационной безопасности применяются для обеспечения защиты человека и окружающей среды от вредного воздействия ионизирующего излучения.',
    icon: 'Globe'
  },
  {
    id: 2,
    title: 'Общие положения',
    content: 'Основные принципы радиационной безопасности: обоснование, оптимизация и нормирование. Любая деятельность должна быть оправдана получаемой пользой.',
    icon: 'FileText'
  },
  {
    id: 3,
    title: 'Ограничение техногенного облучения',
    content: 'Установление пределов доз облучения для персонала и населения при работе с источниками ионизирующего излучения в контролируемых условиях.',
    icon: 'ShieldAlert'
  },
  {
    id: 4,
    title: 'Нормальные условия эксплуатации',
    content: 'Регламентируются дозовые пределы для персонала категории А (20 мЗв/год) и категории Б (5 мЗв/год) при штатной работе с источниками излучения.',
    icon: 'Settings'
  },
  {
    id: 5,
    title: 'Планируемое повышенное облучение',
    content: 'В особых случаях допускается превышение установленных пределов доз при выполнении работ по ликвидации аварий и предотвращению катастроф.',
    icon: 'TrendingUp'
  },
  {
    id: 6,
    title: 'Защита от природного облучения',
    content: 'Меры по ограничению облучения работников природными источниками радиации: радон в помещениях, космическое излучение, природные радионуклиды.',
    icon: 'Mountain'
  },
  {
    id: 7,
    title: 'Ограничение облучения населения',
    content: 'Установлен предел эффективной дозы для населения - 1 мЗв в год. Учитывается облучение от всех источников, кроме медицинского и природного.',
    icon: 'Users'
  },
  {
    id: 8,
    title: 'Облучение в условиях аварии',
    content: 'При радиационных авариях применяются уровни вмешательства и защитные меры: укрытие, эвакуация, йодная профилактика, ограничения на продукты.',
    icon: 'AlertTriangle'
  },
  {
    id: 9,
    title: 'Контроль за выполнением Норм',
    content: 'Осуществляется радиационный контроль: индивидуальный дозиметрический контроль персонала, контроль рабочих мест, контроль радиоактивных выбросов.',
    icon: 'Search'
  },
  {
    id: 10,
    title: 'Допустимые уровни воздействия',
    content: 'Установлены нормативы: предельно допустимые дозы, допустимые уровни содержания радионуклидов, контрольные уровни облучения.',
    icon: 'BarChart3'
  }
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection('next');
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection('prev');
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 'next' : 'prev');
    setCurrentSlide(index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-5xl">
        <div 
          key={currentSlide}
          className={`${
            direction === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left'
          }`}
        >
          <div className="bg-card rounded-2xl p-12 md:p-16 shadow-2xl border border-border">
            <div className="flex items-center justify-center mb-8">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name={slide.icon as any} size={48} className="text-primary" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-foreground">
              {slide.title}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed max-w-3xl mx-auto">
              {slide.content}
            </p>

            <div className="flex items-center justify-center gap-2 mt-12">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Слайд ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8 gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center gap-2"
          >
            <Icon name="ChevronLeft" size={20} />
            <span className="hidden sm:inline">Назад</span>
          </Button>

          <div className="text-muted-foreground font-medium">
            {currentSlide + 1} / {slides.length}
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-2"
          >
            <span className="hidden sm:inline">Вперёд</span>
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          Используйте клавиши ← → для навигации
        </div>
      </div>
    </div>
  );
}
